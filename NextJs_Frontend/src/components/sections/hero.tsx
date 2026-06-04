import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Phiên bản 2.0 đã ra mắt 🎉</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-up [animation-delay:0.1s]">
          Xây dựng ứng dụng{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-primary via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              nhanh hơn
            </span>
          </span>
          {" "}bao giờ hết
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 animate-fade-up [animation-delay:0.2s]">
          Template Next.js 15 sẵn sàng production với TailwindCSS, shadcn/ui, TypeScript.
          Tập trung vào sản phẩm — không mất thời gian cài đặt.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-up [animation-delay:0.3s]">
          <Button size="xl" variant="gradient" asChild className="rounded-full">
            <Link href="/register">
              Bắt đầu miễn phí
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" asChild className="rounded-full">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="h-4 w-4" />
              Xem GitHub
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 justify-center animate-fade-up [animation-delay:0.4s]">
          {[
            { value: "10K+", label: "Dự án được tạo" },
            { value: "50K+", label: "Nhà phát triển" },
            { value: "4.9/5", label: "Đánh giá trung bình" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
