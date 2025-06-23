// File: src/app/api/clear-cart/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/sanity/lib/db/db';
import { cartItems } from '@/sanity/lib/db/schema';

export async function DELETE() {
  try {
    await db.delete(cartItems); // ❗ deletes all items
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Failed to clear cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
