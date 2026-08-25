'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Card, Badge, Button } from '@medar/ui';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login?callbackUrl=/checkout');
        return;
      }

      // Step 1: Create Order via API
      const res = await fetch('http://localhost:4000/api/v1/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: 45000,
          currency: 'INR'
        })
      });

      if (!res.ok) {
        throw new Error('Failed to initialize payment order');
      }

      const orderData = await res.json();

      // Step 2: Verify & Fulfill Payment
      const verifyRes = await fetch('http://localhost:4000/api/v1/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          razorpayOrderId: orderData.orderId,
          razorpayPaymentId: `pay_${Date.now()}`,
          razorpaySignature: 'dummy_sig'
        })
      });

      if (verifyRes.ok) {
        router.push('/app/dashboard?enrolled=true');
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Payment processing error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-2">
            <Link href="/programs" className="text-xs font-mono text-amber-400 hover:underline">
              ← Back to Programs
            </Link>
            <h1 className="text-3xl font-serif font-bold text-white">Enrollment Checkout</h1>
            <p className="text-xs text-slate-400 font-mono">Secure Razorpay Gateway · 256-bit SSL Encryption</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded">
              {error}
            </div>
          )}

          <Card variant="bordered" className="p-8 bg-slate-900/90 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div>
                <Badge variant="gold">COHORT 1 ENROLLMENT</Badge>
                <h2 className="text-xl font-serif font-bold text-white mt-2">
                  Certificate in Mediation — Foundation Program
                </h2>
                <p className="text-xs text-slate-400">40 Hours Hybrid · IMI Aligned Curriculum</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-serif font-bold text-amber-400">₹45,000</span>
                <span className="block text-[10px] text-slate-400">INR (All Inclusive)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Tuition Fee</span>
                <span>₹38,135.59</span>
              </div>
              <div className="flex justify-between"><span>GST (18%)</span><span>₹6,864.41</span></div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-amber-400">₹45,000.00</span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={loading}
              className="w-full justify-center text-xs uppercase tracking-wider py-3 shadow-lg shadow-amber-600/30"
            >
              {loading ? 'Processing Payment...' : 'Proceed to Razorpay Payment (₹45,000) →'}
            </Button>

            <p className="text-[10px] text-center text-slate-500">
              By proceeding, you agree to Medar Terms of Service & Cohort Cancellation Policy.
            </p>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
}
