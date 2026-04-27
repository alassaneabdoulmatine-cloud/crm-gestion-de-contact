import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart3, 
  CheckCircle2,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus CRM</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Fonctionnalités</Link>
            <Link href="#solutions" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Solutions</Link>
            <Link href="#temoignages" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Témoignages</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="hidden sm:inline-flex">Connexion</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-black text-white hover:bg-black/90">Démarrer gratuitement</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Nouveau: Dashboard Analytics v2.0
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Gérez vos relations client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">sans effort.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Nexus CRM centralise vos contacts, vos opportunités et vos données pour vous aider à conclure plus de ventes et à fidéliser vos clients.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base bg-black hover:bg-black/90 shadow-lg shadow-black/10">
                  Accéder au Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Voir la démo
              </Button>
            </div>
            
            {/* Mockup Preview */}
            <div className="mt-16 lg:mt-24 relative mx-auto max-w-5xl">
              <div className="rounded-xl border bg-gray-50/50 p-2 backdrop-blur-sm shadow-2xl">
                <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                   <div className="h-10 border-b bg-gray-50 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex-1 flex justify-center">
                        <div className="h-6 w-1/2 bg-gray-100 rounded-md border text-[10px] flex items-center px-2 text-gray-400">nexus-crm.app/dashboard</div>
                      </div>
                   </div>
                   <div className="aspect-video bg-gray-50 flex items-center justify-center relative overflow-hidden">
                      {/* Decorative elements representing a UI */}
                      <div className="absolute top-4 left-4 w-48 h-full border-r bg-white hidden sm:block"></div>
                      <div className="grid grid-cols-3 gap-4 w-3/4 p-8">
                        <div className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse"></div>
                        <div className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse delay-75"></div>
                        <div className="h-32 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse delay-150"></div>
                        <div className="col-span-2 h-48 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse delay-200"></div>
                        <div className="h-48 bg-white rounded-xl border border-gray-100 shadow-sm animate-pulse delay-300"></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Gradient */}
          <div className="absolute top-0 -z-10 h-full w-full bg-white">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,216,230,0.3)] opacity-50 blur-[80px]"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tout ce dont vous avez besoin</h2>
              <p className="mt-4 text-lg text-gray-600">Une suite complète d'outils pour transformer votre gestion commerciale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Gestion des Contacts",
                  description: "Centralisez toutes vos informations clients et leur historique en un seul endroit.",
                  icon: Users,
                  color: "blue"
                },
                {
                  title: "Pipeline de Ventes",
                  description: "Visualisez votre tunnel de conversion avec notre interface Kanban intuitive.",
                  icon: LayoutDashboard,
                  color: "indigo"
                },
                {
                  title: "Analytics Avancés",
                  description: "Prenez des décisions basées sur des données réelles avec nos rapports détaillés.",
                  icon: BarChart3,
                  color: "violet"
                },
                {
                  title: "Automatisation",
                  description: "Gagnez du temps en automatisant vos tâches récurrentes et vos rappels.",
                  icon: Zap,
                  color: "amber"
                },
                {
                  title: "Sécurité Maximale",
                  description: "Vos données sont cryptées et protégées par les standards les plus élevés.",
                  icon: ShieldCheck,
                  color: "emerald"
                },
                {
                  title: "Collaboration",
                  description: "Travaillez en équipe de manière fluide avec le partage d'opportunités.",
                  icon: Briefcase,
                  color: "sky"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group relative rounded-2xl border bg-white p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${feature.color}-50 text-${feature.color}-600 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-black px-8 py-16 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-3xl font-bold sm:text-5xl mb-6">Prêt à booster votre croissance ?</h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-10">Rejoignez des centaines d'entreprises qui utilisent Nexus CRM pour propulser leurs ventes.</p>
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-gray-100">
                    Commencer l'aventure
                  </Button>
                </Link>
               </div>
               
               {/* Decorative background for CTA */}
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
               <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-black" />
              <span className="text-lg font-bold">Nexus CRM</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <Link href="#" className="hover:text-black transition-colors">Confidentialité</Link>
              <Link href="#" className="hover:text-black transition-colors">Conditions</Link>
              <Link href="#" className="hover:text-black transition-colors">Support</Link>
              <Link href="#" className="hover:text-black transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Nexus CRM. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}