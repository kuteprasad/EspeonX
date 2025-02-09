import { createContext, useContext, useState } from "react"

const BlockchainContext = createContext()

const initialProposals = [
  {
    id: 1,
    title: "Prize Pool Distribution Update",
    description: "Adjust tournament prize distribution to 40/30/20/10 for more competitive play",
    votesFor: 1234,
    votesAgainst: 432,
    endsIn: "2 days",
    status: "active",
    category: "Economy",
    voters: new Set(),
  },
  {
    id: 2,
    title: "Weekly Community Tournaments",
    description: "Implement weekly tournaments with special rewards and rankings",
    votesFor: 890,
    votesAgainst: 234,
    endsIn: "5 days",
    status: "active",
    category: "Tournament",
    voters: new Set(),
  },
  {
    id: 3,
    title: "Community Events Schedule",
    description: "Weekly community tournaments with special rewards",
    votesFor: 567,
    votesAgainst: 123,
    endsIn: "3 days",
    status: "active",
    voters: new Set(),
    category: "Community",
  }
]

export function BlockchainProvider({ children }) {
  const [proposals, setProposals] = useState(initialProposals)
  const [transactions, setTransactions] = useState([])
  const [userAddress] = useState("0x1234...5678")

  const createProposal = (title, description, category) => {
    const newProposal = {
      id: proposals.length + 1,
      title,
      description,
      votesFor: 0,
      votesAgainst: 0,
      endsIn: "7 days",
      status: "active",
      voters: new Set(),
      category,
      creator: userAddress,
      createdAt: new Date().toISOString(),
    }
    setProposals(prev => [...prev, newProposal])
    addTransaction("Create Proposal", `Created proposal: ${title}`)
    return true
  }

  const vote = (proposalId, isFor) => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId) {
        if (proposal.voters.has(userAddress)) {
          return proposal
        }
        const updatedVoters = new Set(proposal.voters)
        updatedVoters.add(userAddress)
        return {
          ...proposal,
          votesFor: isFor ? proposal.votesFor + 100 : proposal.votesFor,
          votesAgainst: !isFor ? proposal.votesAgainst + 100 : proposal.votesAgainst,
          voters: updatedVoters
        }
      }
      return proposal
    }))
    addTransaction("Vote Cast", `Voted ${isFor ? "For" : "Against"} proposal ${proposalId}`)
  }

  const addTransaction = (type, description) => {
    const newTransaction = {
      id: transactions.length + 1,
      type,
      description,
      timestamp: new Date().toISOString(),
    }
    setTransactions(prev => [newTransaction, ...prev])
  }

  return (
    <BlockchainContext.Provider value={{
      proposals,
      transactions,
      userAddress,
      createProposal,
      vote,
    }}>
      {children}
    </BlockchainContext.Provider>
  )
}

export const useBlockchain = () => useContext(BlockchainContext)