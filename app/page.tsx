'use client'

import { useState } from "react";
import { AuthModal } from "@/components/authModal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div>reexchange website</div>
    </>
  );
}