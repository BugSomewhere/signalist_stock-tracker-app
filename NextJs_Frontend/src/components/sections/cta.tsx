import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-violet-500/10 p-12 text-center">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[80px] -z-10" />

          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Sẵn sàng bắt đầu{" "}
              <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                xây dựng?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tham gia cùng hàng ngàn nhà phát triển đã tin tưởng NextApp.
              Miễn phí mãi mãi cho dự án cá nhân.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="xl" variant="gradient" asChild className="rounded-full">
                <Link href="/register">
                  Tạo tài khoản miễn phí
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="rounded-full">
                <Link href="/login">Đăng nhập ngay</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Không cần thẻ tín dụng · Cài đặt trong 2 phút · Hủy bất cứ lúc nào
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
