import { Webhook } from 'svix';
import User from '../models/userModel.js';

export const handleWebhook = async (req, res) => {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook("whsec_c06S7RIIXGRBxRz/swLsvlX9oECkjqCJ");
    const evt = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      console.log(`User ${id} was created`);

      const user = new User({
        clerkUserId: id,
        firstName: attributes.first_name,
        lastName: attributes.last_name,
        userName: attributes.username,
      });

      await user.save();
      console.log('User saved to database');

    } else if (eventType === 'user.updated') {
      console.log(`User ${id} was updated`);

      const updatedUser = await User.findOneAndUpdate(
        { clerkUserId: id },
        {
          firstName: attributes.first_name,
          lastName: attributes.last_name,
          userName: attributes.username,
        },
        { new: true }
      );

      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);
      } else {
        console.log('User not found in database');
      }
    }

    res.status(200).json({ success: true, message: 'Webhook received' });

  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
