import {
  Zap, Shield, Palette, Code2, Globe, BarChart3
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Hiệu suất cao",
    description: "Tối ưu hoá cho Core Web Vitals. Server Components, Streaming và caching tự động.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: Shield,
    title: "Bảo mật tốt nhất",
    description: "Xác thực JWT, CSRF protection, rate limiting và bảo vệ XSS tích hợp sẵn.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: Palette,
    title: "UI đẹp với shadcn",
    description: "50+ components được thiết kế sẵn, hỗ trợ dark/light mode và dễ dàng tùy chỉnh.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Code2,
    title: "TypeScript đầy đủ",
    description: "Type-safe từ database đến UI. Auto-complete và phát hiện lỗi ngay khi viết code.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: Globe,
    title: "SEO được tối ưu",
    description: "Metadata API, sitemap, structured data và OG images tự động tạo.",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
  {
    icon: BarChart3,
    title: "Analytics tích hợp",
    description: "Dashboard analytics, tracking người dùng và báo cáo hiệu suất thời gian thực.",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            ✨ Tính năng nổi bật
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mọi thứ bạn cần để{" "}
            <span className="bg-gradient-to-r from-primary to-violet-400 bg-clip-text text-transparent">
              launch nhanh
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Đầy đủ công cụ và tính năng để xây dựng ứng dụng web chuyên nghiệp,
            từ MVP đến sản phẩm enterprise.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`inline-flex p-2.5 rounded-xl border ${feature.bg}`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
