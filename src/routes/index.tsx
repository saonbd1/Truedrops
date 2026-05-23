import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import {
  Gift,
  Clock,
  Users,
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
  Star,
  Zap,
  Shield,
  Coins,
  ChevronDown,
  Bell,
  Twitter,
  Globe,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

type Status = 'active' | 'upcoming' | 'ended'
type Category = 'DeFi' | 'Layer 2' | 'NFT' | 'Gaming' | 'Infrastructure' | 'DEX' | 'Lending'

interface Airdrop {
  id: number
  name: string
  symbol: string
  logo: string
  description: string
  status: Status
  category: Category
  estimatedValue: string
  totalAllocation: string
  participants: string
  endDate: string
  requirements: string[]
  chain: string
  featured: boolean
  twitter: string
  website: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const airdrops: Airdrop[] = [
  {
    id: 1,
    name: 'INK',
    symbol: 'INK',
    logo: '🌟',
    description: 'Decentralized exchange on Ethereum with concentrated liquidity. Early traders and liquidity providers are eligible for the genesis airdrop.',
    status: 'active',
    category: 'L2',
    estimatedValue: '$200–$800',
    totalAllocation: '15% of supply',
    participants: '48,200',
    endDate: '2026-06-30',
    requirements: ['Provide liquidity ≥ $500', 'Complete 10+ trades', 'Hold wallet ≥ 90 days'],
    chain: 'Ethereum',
    featured: true,
    twitter: 'novadex',
    website: 'novadex.finance',
    difficulty: 'Medium',
  },
  {
    id: 2,
    name: 'DOMA',
    symbol: 'DOMA',
    logo: '⚡',
    description: 'Zero-knowledge cross-chain bridge enabling fast, trustless transfers. Bridge assets across 10+ chains to qualify.',
    status: 'active',
    category: 'Infrastructure',
    estimatedValue: '$500–$2,000',
    totalAllocation: '10% of supply',
    participants: '112,500',
    endDate: '2026-07-15',
    requirements: ['Bridge assets ≥ $100', 'Use 3+ different chains', 'Min. 5 transactions'],
    chain: 'Multi-chain',
    featured: true,
    twitter: '',
    website: 'zkbridge.io',
    difficulty: 'Easy',
  },
  {
    id: 3,
    name: 'Spekter',
    symbol: 'SPEK',
    logo: '🏦',
    description: 'Omnichain lending protocol allowing borrowing and lending across any blockchain from a single interface.',
    status: 'active',
    category: 'Lending',
    estimatedValue: '$300–$1,200',
    totalAllocation: '8% of supply',
    participants: '67,800',
    endDate: '2026-08-01',
    requirements: ['Deposit ≥ $200', 'Borrow at least once', 'Maintain position 30 days'],
    chain: 'LayerZero',
    featured: false,
    twitter: 'omnilend',
    website: 'omnilend.xyz',
    difficulty: 'Medium',
  },
  {
    id: 4,
    name: 'DACHAIN',
    symbol: 'DAC',
    logo: '🎮',
    description: 'On-chain gaming ecosystem with player-owned assets. Early players and NFT holders receive governance tokens.',
    status: 'upcoming',
    category: 'Gaming',
    estimatedValue: '$150–$600',
    totalAllocation: '20% of supply',
    participants: '29,300',
    endDate: '2026-09-15',
    requirements: ['Own a Realm NFT', 'Play 10+ hours', 'Refer 2 friends'],
    chain: 'Immutable X',
    featured: false,
    twitter: 'pixelrealm',
    website: 'pixelrealm.gg',
    difficulty: 'Hard',
  },
  {
    id: 5,
    name: 'QUIPNETWORK',
    symbol: 'QUIP',
    logo: '🔷',
    description: 'Automated yield optimizer on Arbitrum. Stake, farm, and earn while qualifying for the community airdrop.',
    status: 'active',
    category: 'DeFi',
    estimatedValue: '$400–$1,500',
    totalAllocation: '12% of supply',
    participants: '83,600',
    endDate: '2026-06-20',
    requirements: ['Deposit ≥ $100 in vaults', 'Lock for 30+ days', 'Vote in governance'],
    chain: 'Arbitrum',
    featured: true,
    twitter: 'arbivault',
    website: 'arbivault.fi',
    difficulty: 'Easy',
  },
  {
    id: 6,
    name: 'SleepGotchi',
    symbol: 'SCP',
    logo: '📜',
    description: 'Identity and credentials layer for Scroll network. Mint your on-chain passport to claim early user rewards.',
    status: 'upcoming',
    category: 'Layer 2',
    estimatedValue: '$100–$400',
    totalAllocation: '18% of supply',
    participants: '156,000',
    endDate: '2026-10-01',
    requirements: ['Use Scroll mainnet', 'Mint ScrollPass NFT', 'Complete 3 tasks'],
    chain: 'Scroll',
    featured: false,
    twitter: 'scrollpass',
    website: 'scrollpass.xyz',
    difficulty: 'Easy',
  },
  {
    id: 7,
    name: 'MorphoFi',
    symbol: 'MRPH',
    logo: '🦋',
    description: 'Peer-to-peer lending protocol offering better rates than traditional money markets through optimized matching.',
    status: 'ended',
    category: 'Lending',
    estimatedValue: '$600–$2,500',
    totalAllocation: '7.5% of supply',
    participants: '210,000',
    endDate: '2026-04-01',
    requirements: ['Supply ≥ $500', 'Borrow ≥ $200', 'Hold 60 days'],
    chain: 'Ethereum',
    featured: false,
    twitter: 'morphofi',
    website: 'morpho.fi',
    difficulty: 'Medium',
  },
  {
    id: 8,
    name: 'FluxNFT',
    symbol: 'FLUX',
    logo: '🎨',
    description: 'Creator-first NFT marketplace with on-chain royalties and DAO governance. Collectors and creators split token rewards.',
    status: 'active',
    category: 'NFT',
    estimatedValue: '$80–$350',
    totalAllocation: '25% of supply',
    participants: '34,700',
    endDate: '2026-07-31',
    requirements: ['Buy or sell 1 NFT', 'List a collection', 'Join Discord'],
    chain: 'Base',
    featured: false,
    twitter: 'fluxnft',
    website: 'fluxnft.art',
    difficulty: 'Easy',
  },
]

const STATUS_CONFIG: Record<Status, { label: string; classes: string; dot: string }> = {
  active: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  upcoming: { label: 'Upcoming', classes: 'bg-blue-100 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
  ended: { label: 'Ended', classes: 'bg-gray-100 text-gray-500 border border-gray-200', dot: 'bg-gray-400' },
}

const DIFFICULTY_CONFIG: Record<string, { classes: string }> = {
  Easy: { classes: 'text-emerald-600 bg-emerald-50' },
  Medium: { classes: 'text-amber-600 bg-amber-50' },
  Hard: { classes: 'text-red-600 bg-red-50' },
}

const CATEGORIES: Array<Category | 'All'> = ['All', 'DeFi', 'DEX', 'Layer 2', 'NFT', 'Gaming', 'Infrastructure', 'Lending']
const STATUSES: Array<Status | 'all'> = ['all', 'active', 'upcoming', 'ended']

function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[difficulty].classes}`}>
      {difficulty}
    </span>
  )
}

function AirdropCard({ airdrop }: { airdrop: Airdrop }) {
  const daysLeft = Math.ceil((new Date(airdrop.endDate).getTime() - Date.now()) / 86400000)
  const isEnded = airdrop.status === 'ended'

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${isEnded ? 'opacity-70 border-gray-200' : airdrop.featured ? 'border-violet-200 shadow-sm shadow-violet-100' : 'border-gray-200'}`}>
      {airdrop.featured && !isEnded && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-t-2xl flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-current" />
          Featured Airdrop
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              {airdrop.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{airdrop.name}</h3>
                <span className="text-xs font-mono font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">${airdrop.symbol}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">{airdrop.chain}</span>
                <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">{airdrop.category}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={airdrop.status} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{airdrop.description}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Est. Value</p>
            <p className="text-sm font-bold text-gray-800">{airdrop.estimatedValue}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Allocation</p>
            <p className="text-sm font-bold text-gray-800">{airdrop.totalAllocation}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-0.5">Participants</p>
            <p className="text-sm font-bold text-gray-800">{airdrop.participants}</p>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Requirements</p>
          <ul className="space-y-1">
            {airdrop.requirements.map((req, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-4 h-4 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs flex-shrink-0 font-bold">{i + 1}</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <DifficultyBadge difficulty={airdrop.difficulty} />
            {!isEnded && daysLeft > 0 && (
              <span className={`flex items-center gap-1 text-xs font-medium ${daysLeft <= 7 ? 'text-red-500' : 'text-gray-400'}`}>
                <Clock className="w-3 h-3" />
                {daysLeft}d left
              </span>
            )}
            {isEnded && <span className="text-xs text-gray-400">Airdrop ended</span>}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/${airdrop.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://${airdrop.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isEnded ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
            >
              {isEnded ? 'Ended' : 'Claim'}
              {!isEnded && <ExternalLink className="w-3 h-3" />}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all')
  const [sortBy, setSortBy] = useState<'value' | 'participants' | 'deadline'>('value')

  const filtered = useMemo(() => {
    let result = airdrops.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.symbol.toLowerCase().includes(search.toLowerCase()) ||
        a.description.toLowerCase().includes(search.toLowerCase())
      const matchCat = selectedCategory === 'All' || a.category === selectedCategory
      const matchStatus = selectedStatus === 'all' || a.status === selectedStatus
      return matchSearch && matchCat && matchStatus
    })

    result = [...result].sort((a, b) => {
      if (sortBy === 'participants') {
        return parseInt(b.participants.replace(/,/g, '')) - parseInt(a.participants.replace(/,/g, ''))
      }
      if (sortBy === 'deadline') {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
      }
      // sort by est value (use max)
      const valA = parseInt(a.estimatedValue.split('–')[1]?.replace(/[$,]/g, '') || '0')
      const valB = parseInt(b.estimatedValue.split('–')[1]?.replace(/[$,]/g, '') || '0')
      return valB - valA
    })

    // Featured first
    return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  }, [search, selectedCategory, selectedStatus, sortBy])

  const counts = {
    active: airdrops.filter((a) => a.status === 'active').length,
    upcoming: airdrops.filter((a) => a.status === 'upcoming').length,
    totalValue: '$50M+',
    participants: '500K+',
  }

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0f0f13]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Coins className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">TrueDrops.XYZ</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Listings</a>
            <a href="#" className="hover:text-white transition-colors">How it Works</a>
            <a href="#" className="hover:text-white transition-colors">Guides</a>
          </nav>
          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            Get Alerts
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3 h-3" />
            {counts.active} Active Airdrops Available Now
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Hunt the Best{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Crypto Airdrops
            </span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Discover free token distributions, check eligibility, and never miss a deadline. All in one place.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { icon: Gift, label: 'Active Airdrops', value: counts.active.toString() },
              { icon: Clock, label: 'Coming Soon', value: counts.upcoming.toString() },
              { icon: TrendingUp, label: 'Total Value', value: counts.totalValue },
              { icon: Users, label: 'Total Hunters', value: counts.participants },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-white">
                  <Icon className="w-5 h-5 text-violet-400" />
                  {value}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search airdrops by name, symbol, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-violet-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Status filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Status | 'all')}
                className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg pl-8 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-gray-900">
                    {s === 'all' ? 'All Status' : STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white/5 border border-white/10 text-gray-300 text-xs rounded-lg pl-8 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <option value="value" className="bg-gray-900">Sort: Est. Value</option>
                <option value="participants" className="bg-gray-900">Sort: Participants</option>
                <option value="deadline" className="bg-gray-900">Sort: Deadline</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-5">
          Showing <span className="text-white font-semibold">{filtered.length}</span> airdrop{filtered.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && <> in <span className="text-violet-400">{selectedCategory}</span></>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((airdrop) => (
              <AirdropCard key={airdrop.id} airdrop={airdrop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg font-medium">No airdrops match your filters</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your search or category selection</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex gap-4">
          <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold text-sm mb-1">Stay Safe from Scams</p>
            <p className="text-amber-200/60 text-xs leading-relaxed">
              Never share your seed phrase or private keys for any airdrop. Legitimate airdrops only require on-chain activity — they never ask for your wallet credentials. Always verify official links from project social channels before connecting your wallet.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-violet-400" />
            <span className="font-bold text-gray-400">TrueDrops.XYZ</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors flex items-center gap-1"><Twitter className="w-3.5 h-3.5" /> Twitter</a>
            <a href="#" className="hover:text-gray-400 transition-colors flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Website</a>
            <span>All listings for informational purposes only. DYOR.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
