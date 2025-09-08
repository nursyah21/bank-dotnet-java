import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start mb-6">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Bank Acme Inc.
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
