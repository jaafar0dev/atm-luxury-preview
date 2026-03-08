import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Slider } from "@/components/ui/slider";
import { useState, useMemo } from "react";
import { Home, Percent, Clock, TrendingUp, Calculator, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MortgageCalculator = () => {
  const [price, setPrice] = useState(50000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(15);
  const [loanTerm, setLoanTerm] = useState(20);

  const calculations = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalPayments;
    } else {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const totalCost = monthlyPayment * totalPayments;
    const totalInterest = totalCost - loanAmount;

    return { downPayment, loanAmount, monthlyPayment, totalPayments, totalInterest, totalCost };
  }, [price, downPaymentPercent, interestRate, loanTerm]);

  const formatN = (n: number) => "₦" + Math.round(n).toLocaleString();

  return (
    <PublicLayout>
      <PageHero title="Mortgage Calculator" subtitle="Calculate your estimated monthly mortgage payment and plan your investment" />

      <section className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <ScrollAnimation direction="left">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="text-primary" size={24} />
                <h2 className="font-display font-bold text-xl text-foreground">Property Details</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><Home size={14} /> Property Price</span>
                    <span className="font-semibold text-primary">{formatN(price)}</span>
                  </div>
                  <Slider value={[price]} onValueChange={([v]) => setPrice(v)} min={5000000} max={500000000} step={1000000} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₦5M</span><span>₦500M</span></div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><DollarSign size={14} /> Down Payment ({downPaymentPercent}%)</span>
                    <span className="font-semibold text-primary">{formatN(calculations.downPayment)}</span>
                  </div>
                  <Slider value={[downPaymentPercent]} onValueChange={([v]) => setDownPaymentPercent(v)} min={0} max={50} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₦0</span><span>{formatN(price * 0.5)}</span></div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><Percent size={14} /> Interest Rate (per year)</span>
                    <span className="font-semibold text-primary">{interestRate}%</span>
                  </div>
                  <Slider value={[interestRate]} onValueChange={([v]) => setInterestRate(v)} min={5} max={30} step={0.5} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>5%</span><span>30%</span></div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock size={14} /> Loan Term</span>
                    <span className="font-semibold text-primary">{loanTerm} years</span>
                  </div>
                  <Slider value={[loanTerm]} onValueChange={([v]) => setLoanTerm(v)} min={5} max={30} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>5 years</span><span>30 years</span></div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Results */}
          <ScrollAnimation direction="right">
            <div className="space-y-4">
              <div className="bg-primary rounded-lg p-6">
                <p className="text-sm text-primary-foreground/70">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold text-primary-foreground">{formatN(calculations.monthlyPayment)}</p>
                <div className="w-16 h-1 bg-primary-foreground/30 rounded mt-3" />
                <p className="text-sm text-primary-foreground/60 mt-2">{downPaymentPercent}% down payment</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><TrendingUp size={12} /> Loan Amount</p>
                  <p className="font-bold text-foreground mt-1">{formatN(calculations.loanAmount)}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> Total Payments</p>
                  <p className="font-bold text-foreground mt-1">{calculations.totalPayments} months</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Percent size={12} /> Total Interest</p>
                  <p className="font-bold text-primary mt-1">{formatN(calculations.totalInterest)}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Home size={12} /> Total Cost</p>
                  <p className="font-bold text-foreground mt-1">{formatN(calculations.totalCost)}</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">Need help with mortgage options? Our team can assist you.</p>
                <Link to="/contact">
                  <Button className="btn-primary">Contact Our Team</Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PublicLayout>
  );
};

export default MortgageCalculator;
