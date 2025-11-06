import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--primary-light)] to-white">
      <Navigation isAuthenticated={false} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--gray-900)] mb-6">
            Keep track of your tabs.<br />
            <span className="text-[var(--primary)]">Split expenses easily.</span>
          </h1>
          <p className="text-xl text-[var(--gray-600)] mb-8 max-w-2xl mx-auto">
            Share bills, track IOUs, and settle up with friends. Tab-Keeper makes splitting expenses simple and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Sign up for free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">Track balances</h3>
            <p className="text-[var(--gray-600)]">
              Keep tabs on who owes what with automatic balance calculations and updates.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">Organize groups</h3>
            <p className="text-[var(--gray-600)]">
              Create groups for roommates, trips, couples, or any shared expenses.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">Settle up</h3>
            <p className="text-[var(--gray-600)]">
              Record payments and keep everyone in the loop when you settle debts.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[var(--primary)] rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to simplify your shared expenses?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust Tab-Keeper to manage their tabs.
          </p>
          <Link href="/register">
            <Button variant="outline" size="lg" className="bg-white text-[var(--primary)] border-white hover:bg-white/90 px-8">
              Get started now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
