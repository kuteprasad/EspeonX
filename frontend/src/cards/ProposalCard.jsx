import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useBlockchain } from "@/context/BlockchainContext"

const ProposalCard = ({ id, title, description, votesFor, votesAgainst, endsIn, category, voters, onVote }) => {
    const { userAddress } = useBlockchain()
    const totalVotes = votesFor + votesAgainst
    const forPercentage = totalVotes === 0 ? 0 : (votesFor / totalVotes) * 100
    const hasVoted = voters.has(userAddress)
  
    return (
      <div className="border border-green-500/20 p-4 rounded-lg space-y-4 bg-black/20">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
            {category}
          </span>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
        <Progress value={forPercentage} className="h-2" />
        <div className="flex justify-between text-sm">
          <span>For: {votesFor}</span>
          <span>Against: {votesAgainst}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Ends in {endsIn}</span>
          <div className="space-x-2">
            {hasVoted ? (
              <span className="text-sm text-gray-400">Already voted</span>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => onVote(true)}>For</Button>
                <Button variant="outline" size="sm" onClick={() => onVote(false)}>Against</Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

export default ProposalCard

