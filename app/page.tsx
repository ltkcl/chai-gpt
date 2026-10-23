import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Lightbulb,
  MessageSquareText,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: Lightbulb,
    title: "Explore ideas",
    description: "Turn a half-formed thought into a plan, a story, or a fresh perspective.",
  },
  {
    icon: Code2,
    title: "Make things",
    description: "Work through code, drafts, and tricky problems with a helpful collaborator.",
  },
  {
    icon: BrainCircuit,
    title: "Learn at your pace",
    description: "Get clear explanations, useful examples, and answers that meet you where you are.",
  },
];

export default async function LandingPage() {
  const { userId } = await auth();
  const destination = userId ? "/chat" : "/sign-up";

  return (
    <main className="min-h-svh overflow-hidden bg-background">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ChaiGPT home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <MessageSquareText className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ChaiGPT</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#how-it-helps" className="transition-colors hover:text-foreground">What you can do</Link>
          <Link href="#preview" className="transition-colors hover:text-foreground">Take a look</Link>
        </nav>

        <div className="flex items-center gap-2">
          {userId ? (
            <Button className="rounded-full px-4" render={<Link href={destination} />}>Open chat</Button>
          ) : (
            <>
              <Button variant="ghost" render={<Link href="/sign-in" />}>Sign in</Button>
              <Button className="rounded-full px-4" render={<Link href={destination} />}>Get started</Button>
            </>
          )}
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -left-44 top-12 size-[25rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-sm text-muted-foreground shadow-sm">
            <Sparkles className="size-4 text-primary" />
            A little more clarity, one chat at a time
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Big thoughts start with a <span className="text-primary">conversation.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Meet your everyday AI companion. Ask questions, work through ideas, and make your next good thing with ChaiGPT.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="h-11 rounded-full px-5 text-sm" render={<Link href={destination} />}>{userId ? "Open your chats" : "Start a conversation"} <ArrowRight className="ml-1" /></Button>
            <Button size="lg" variant="outline" className="h-11 rounded-full px-5 text-sm" render={<Link href="#how-it-helps" />}>See what you can do</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Sign up to save your conversations and pick them up anytime.</p>
        </div>

        <div id="preview" className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-chart-2/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border bg-card shadow-2xl shadow-foreground/5">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary"><Sparkles className="size-4" /></span>
                <div><p className="text-sm font-medium">A fresh start</p><p className="text-xs text-muted-foreground">A sample conversation</p></div>
              </div>
              <span className="flex gap-1" aria-hidden="true"><i className="size-2 rounded-full bg-muted-foreground/25" /><i className="size-2 rounded-full bg-muted-foreground/25" /><i className="size-2 rounded-full bg-muted-foreground/25" /></span>
            </div>
            <div className="space-y-6 p-5 sm:p-7">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-muted px-4 py-3 text-sm leading-6">
                I want to learn something new this month. How should I choose?
              </div>
              <div className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><WandSparkles className="size-4" /></span>
                <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p className="font-medium text-foreground">Pick something that makes you curious.</p>
                  <p>Tell me what you already enjoy, how much time you have, and whether you prefer making, reading, or practicing. I can help you find a good first step.</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="rounded-full border bg-background px-3 py-1 text-xs">Try a creative skill</span>
                    <span className="rounded-full border bg-background px-3 py-1 text-xs">Make a learning plan</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border bg-background p-3 shadow-sm">
                <p className="px-1 pb-3 text-sm text-muted-foreground">Ask anything…</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">A space to think out loud</span>
                  <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground"><ArrowUpRight className="size-4" /></span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border bg-card px-4 py-3 text-sm shadow-lg sm:flex">
            <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600"><Sparkles className="size-4" /></span>
            Ready when you are
          </div>
        </div>
      </section>

      <section id="how-it-helps" className="border-y bg-muted/35">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">One chat, many possibilities</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">A helpful place to start</h2>
            <p className="mt-4 text-muted-foreground">Bring the question, the rough draft, or the idea you can’t quite put into words yet.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row lg:px-12">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Your next idea is one message away.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Pick up a new conversation whenever inspiration strikes.</p>
        </div>
        <Button className="rounded-full px-5" render={<Link href={destination} />}>{userId ? "Open chat" : "Get started"} <ArrowRight className="ml-1" /></Button>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span>© {new Date().getFullYear()} ChaiGPT</span>
          <span>Made for curious minds.</span>
        </div>
      </footer>
    </main>
  );
}
