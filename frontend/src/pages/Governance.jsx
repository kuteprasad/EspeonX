import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBlockchain } from "@/context/BlockchainContext"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import ProposalCard from "@/cards/ProposalCard"

const Governance = () => {
  const { proposals, transactions, createProposal, vote, userAddress } = useBlockchain()
  const [open, setOpen] = useState(false)
  const [newProposal, setNewProposal] = useState({ 
    title: '', 
    description: '', 
    category: 'Economy' 
  })

  const handleCreateProposal = () => {
    if (!newProposal.title || !newProposal.description) {
      return
    }
    
    const success = createProposal(
      newProposal.title, 
      newProposal.description,
      newProposal.category
    )
    if (success) {
      setNewProposal({ title: '', description: '', category: 'Economy' })
      setOpen(false)
    }
  }

  const analyticsData = [
    { category: 'Economy', proposals: proposals.filter(p => p.category === 'Economy').length },
    { category: 'Tournament', proposals: proposals.filter(p => p.category === 'Tournament').length },
    { category: 'Community', proposals: proposals.filter(p => p.category === 'Community').length },
  ]

  const activeProposals = proposals.filter(p => p.status === 'active')
  const totalVotes = proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst, 0)

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-green-400">Community Governance</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">Create Proposal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input 
                placeholder="Proposal Title"
                value={newProposal.title}
                onChange={e => setNewProposal({...newProposal, title: e.target.value})}
              />
              <Textarea 
                placeholder="Proposal Description"
                value={newProposal.description}
                onChange={e => setNewProposal({...newProposal, description: e.target.value})}
              />
              <select 
                value={newProposal.category}
                onChange={e => setNewProposal({...newProposal, category: e.target.value})}
                className="w-full p-2 rounded-md border bg-background"
              >
                <option value="Economy">Economy</option>
                <option value="Tournament">Tournament</option>
                <option value="Community">Community</option>
              </select>
              <Button 
                onClick={handleCreateProposal}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={!newProposal.title || !newProposal.description}
              >
                Submit Proposal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-lg bg-green-500/10">
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          <section className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle>Active Proposals ({activeProposals.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProposals.map(proposal => (
                      <ProposalCard 
                        key={proposal.id}
                        {...proposal}
                        onVote={(isFor) => vote(proposal.id, isFor)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle>Voting Power</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400">Your Address</p>
                      <p className="text-xl font-mono">{userAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Available Votes</p>
                      <p className="text-2xl font-bold">100 votes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Proposal Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="proposals" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Voting Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Proposals</p>
                    <p className="text-2xl font-bold">{proposals.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Votes Cast</p>
                    <p className="text-2xl font-bold">
                      {proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold">{tx.type}</p>
                      <p className="text-sm text-gray-400">{tx.description}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      {new Date(tx.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Governance