import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, CheckCircle, Star, X, Check, MapPin, MousePointer2, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- UTILS --- //
const MagneticButton = ({ children, className, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn-magnetic relative overflow-hidden group transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] inline-block ${className}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 rounded-[inherit]" />
    </button>
  );
};

// --- COMPONENTS --- //

const Navbar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl px-6 py-4 rounded-full transition-all duration-500 text-white flex items-center justify-between [&.nav-scrolled]:bg-cream/80 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:text-jade [&.nav-scrolled]:border [&.nav-scrolled]:border-jade/10 [&.nav-scrolled]:shadow-sm"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-4 h-4 bg-jade shadow-sm rounded-sm shrink-0"></div>
        <span className="font-outfit font-semibold text-base sm:text-lg tracking-tight hidden sm:block">Jade Properties</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#how-it-works" className="hover:-translate-y-[1px] transition-transform">How It Works</a>
        <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
        <a href="#process" className="hover:-translate-y-[1px] transition-transform">Process</a>
      </div>
      <MagneticButton
        onClick={() => document.getElementById('offer-portal').scrollIntoView({ behavior: 'smooth' })}
        className="bg-gold text-white font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm shadow-md whitespace-nowrap"
      >
        Get a Cash Offer
      </MagneticButton>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-el", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex items-end pb-24 md:pb-32 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
          alt="Aerial view of beautiful suburban homes"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-jade/30" />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-white">
        <p className="hero-el font-sans font-medium text-base sm:text-lg md:text-xl text-cream/90 uppercase tracking-widest mb-4">
          Selling your home is the
        </p>
        <h1 className="hero-el font-drama italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[1.05] tracking-tight mb-8 sm:mb-10 break-words">
          easiest decision<br className="hidden sm:block" /> you'll make.
        </h1>
        <div className="hero-el flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <MagneticButton
            onClick={() => document.getElementById('offer-portal').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gold text-white text-base sm:text-lg font-medium px-6 py-4 sm:px-8 sm:py-4 rounded-[2rem] shadow-lg shadow-gold/20 flex-shrink-0"
          >
            Get My Cash Offer Today
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const ShufflerCard = () => {
  const cards = ["Single Family", "Multi-Family", "Inherited Property"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-[250px] relative flex items-center justify-center p-8 bg-cream border border-charcoal/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="font-outfit font-semibold text-xl text-jade">Property Intake</h3>
        <p className="text-sm text-charcoal/60 mt-1">We buy all kinds of homes.</p>
      </div>
      <div className="relative w-full h-[120px] mt-12 perspective-[1000px]">
        {cards.map((label, i) => {
          const offset = (i - active + cards.length) % cards.length;
          const isActive = offset === 0;
          return (
            <div
              key={label}
              className="absolute w-full py-4 text-center rounded-2xl bg-white border border-charcoal/10 font-medium text-lg text-charcoal shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                top: '50%',
                left: '50%',
                transform: `translateX(-50%) translateY(calc(-50% + ${offset * 15}px)) translateZ(${-offset * 30}px) scale(${1 - offset * 0.05})`,
                opacity: isActive ? 1 : 1 - offset * 0.3,
                zIndex: cards.length - offset,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState("");
  const fullText = "Analyzing 123 Oak St...\nComps pulled.\nARV calculated.\nCash offer ready:\n$247,000.";

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, current));
      current++;
      if (current > fullText.length + 15) {
        current = 0; // loop with pause
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full min-h-[250px] relative flex flex-col p-8 bg-cream border border-charcoal/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="flex justify-between items-start z-10 mb-8">
        <div>
          <h3 className="font-outfit font-semibold text-xl text-jade">Live Telemetry</h3>
          <p className="text-sm text-charcoal/60 mt-1">Instant offer generation.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full text-xs font-medium text-jade border border-jade/10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
          Live
        </div>
      </div>
      <div className="flex-1 bg-charcoal/5 rounded-xl p-4 font-mono text-sm leading-relaxed text-jade/80 relative">
        {text.split('\n').map((line, i) => (
          <div key={i}>{line}{i === text.split('\n').length - 1 && text.length <= fullText.length && <span className="inline-block w-2 bg-gold animate-pulse ml-1">&nbsp;</span>}</div>
        ))}
        {text.length > fullText.length && (
          <div><span className="inline-block w-2 bg-gold animate-pulse mt-1">&nbsp;</span></div>
        )}
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(cursorRef.current, { x: 80, y: 40, duration: 1, ease: "power2.inOut", delay: 1 })
        .to('.day-target', { backgroundColor: '#C9933A', color: 'white', duration: 0.2 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(cursorRef.current, { x: 120, y: 90, duration: 1, ease: "power2.inOut", delay: 0.5 })
        .to('.confirm-btn', { scale: 1.05, duration: 0.2 })
        .to('.confirm-btn', { backgroundColor: '#1B4332', color: 'white', duration: 0.2 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 })
        .to('.day-target', { backgroundColor: 'transparent', color: 'inherit', duration: 0.5, delay: 1 })
        .to('.confirm-btn', { scale: 1, backgroundColor: 'transparent', color: '#1B4332', duration: 0.5 }, "<")
        .set(cursorRef.current, { x: 0, y: 0, opacity: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-[250px] relative flex flex-col p-8 bg-cream border border-charcoal/5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
      <div className="z-10 mb-6">
        <h3 className="font-outfit font-semibold text-xl text-jade">Closing Scheduler</h3>
        <p className="text-sm text-charcoal/60 mt-1">You pick the date.</p>
      </div>
      <div className="relative flex-1 flex flex-col items-center">
        <div className="grid grid-cols-7 gap-1 w-full text-center text-xs text-charcoal/50 mb-2 font-medium">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div className="grid grid-cols-7 gap-1 w-full text-center text-sm font-medium text-charcoal mb-4">
          <div className="p-1">11</div><div className="p-1">12</div><div className="p-1">13</div>
          <div className="p-1 rounded-md day-target">14</div>
          <div className="p-1">15</div><div className="p-1">16</div><div className="p-1">17</div>
        </div>
        <div className="w-full py-2 border border-jade rounded-xl text-center text-xs font-semibold text-jade confirm-btn transition-colors">
          Confirm Closing
        </div>
        <MousePointer2 ref={cursorRef} className="absolute top-0 left-0 w-5 h-5 text-charcoal fill-charcoal drop-shadow-md z-20" />
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 md:px-16 max-w-[1400px] mx-auto">
      <div className="mb-12 sm:mb-16 md:mb-24 break-words">
        <h2 className="font-drama italic text-4xl sm:text-5xl md:text-6xl text-jade mb-4 leading-tight">Interactive Functional Artifacts</h2>
        <p className="font-sans text-base sm:text-lg text-charcoal/70 max-w-2xl">A seamless process engineered for your convenience. Explore how our digital instruments work for you.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ShufflerCard />
        <TypewriterCard />
        <SchedulerCard />
      </div>
    </section>
  );
};

const Philosophy = () => {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: 1,
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const quote = "Most real estate transactions focus on: agents, commissions, and months of waiting. We focus on: ".split(" ");

  return (
    <section id="philosophy" className="relative w-full min-h-[80vh] flex items-center justify-center bg-charcoal text-white py-32 px-6 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2946&auto=format&fit=crop"
        alt="Dark aerial neighborhood"
        className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center" ref={textRef}>
        <p className="font-sans text-[4.5vw] sm:text-xl md:text-3xl text-cream/70 leading-relaxed max-w-4xl mx-auto flex flex-wrap justify-center gap-x-1 sm:gap-x-2 gap-y-1 mb-8 px-2 sm:px-0">
          {quote.map((word, i) => (
            <span key={i} className="word inline-block">{word}</span>
          ))}
        </p>
        <div className="word font-drama italic text-[12.5vw] sm:text-6xl md:text-9xl text-gold mt-6 leading-none break-words w-full px-2 sm:px-0">
          your<br className="sm:hidden" /> timeline.
        </div>
      </div>
    </section>
  );
};

const ProcessCard = ({ title, desc, icon: Icon, index }) => {
  return (
    <div className="process-card sticky top-0 min-h-[100dvh] w-full flex items-center justify-center origin-top py-20 px-4 md:px-0">
      <div className="w-full md:w-[90%] max-w-5xl bg-cream rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-24 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-16 border border-white/50">
        <div className="flex-1 w-full text-center md:text-left">
          <span className="text-gold font-mono text-xs sm:text-sm tracking-widest font-semibold block mb-4 md:mb-6">PHASE 0{index}</span>
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-6xl text-jade font-semibold mb-4 md:mb-6 tracking-tight break-words">{title}</h2>
          <p className="text-charcoal/70 text-base sm:text-lg md:text-xl font-sans leading-relaxed">{desc}</p>
        </div>
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-white flex items-center justify-center shadow-inner shrink-0 relative overflow-hidden mt-4 md:mt-0">
          {Icon}
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          animation: gsap.to(card.querySelector('div'), {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            ease: "none"
          })
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative bg-white pb-[20vh]">
      <ProcessCard
        index={1}
        title="Tell Us About Your Property"
        desc="Fill out our simple form. No obligation, no agent fees. We just need the basic details to start our analysis."
        icon={<div className="w-24 h-24 border-2 border-jade/20 rounded-xl rotate-45 animate-[spin_10s_linear_infinite]" />}
      />
      <ProcessCard
        index={2}
        title="Receive Your Cash Offer"
        desc="We analyze your home and send a fair cash offer within 24 hours. Using real-time local telemetry, our offer is accurate and immediate."
        icon={
          <div className="relative w-full h-full p-6">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-10">
              {[...Array(16)].map((_, i) => <div key={i} className="border border-jade rounded-sm" />)}
            </div>
            <div className="w-full h-1 bg-gold absolute left-0 top-0 shadow-[0_0_15px_#C9933A] animate-[ping_3s_ease-in-out_infinite_alternate]" style={{ top: '50%' }} />
          </div>
        }
      />
      <ProcessCard
        index={3}
        title="Close On Your Terms"
        desc="Pick your closing date. We handle all the paperwork. You walk away with cash on the exact timeline you choose."
        icon={<Activity className="w-24 h-24 text-jade mix-blend-multiply opacity-50" strokeWidth={1} />}
      />
    </section>
  );
};

const FormSection = () => {
  return (
    <section id="offer-portal" className="bg-cream py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 px-2">
          <h2 className="font-drama italic text-4xl sm:text-5xl md:text-7xl text-jade mb-4 leading-tight break-words">Get Your Free Cash Offer</h2>
          <p className="font-sans text-lg sm:text-xl text-charcoal/60">No fees. No commissions. No obligation.</p>
        </div>
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-cream text-center">
          <p className="font-sans text-lg sm:text-xl text-charcoal/70 mb-10 max-w-xl mx-auto">Tell us about your property in under a minute and we'll run the numbers and get back to you within 24 hours.</p>
          <a href="/sell" className="inline-flex justify-center items-center w-full sm:w-auto bg-gold text-white font-outfit text-xl font-semibold px-12 py-5 rounded-2xl shadow-xl shadow-gold/20 hover:-translate-y-[1px] transition-transform">
            Get My Cash Offer →
          </a>
          <p className="font-sans text-sm text-charcoal/50 mt-8">Questions first? Use the chat in the corner to reach us.</p>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, city, quote }) => (
  <div className="bg-cream/50 border border-charcoal/5 rounded-[2rem] p-8 flex flex-col h-full">
    <div className="flex text-gold mb-6">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
    </div>
    <p className="font-outfit text-lg text-charcoal leading-relaxed mb-8 flex-1">"{quote}"</p>
    <div>
      <p className="font-semibold text-jade">{name}</p>
      <div className="flex items-center gap-1 text-sm text-charcoal/50 mt-1">
        <MapPin className="w-3 h-3" />
        {city}
      </div>
    </div>
  </div>
);

const SocialProof = () => {
  return (
    <section className="bg-white py-32 px-6 border-b border-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="font-drama italic text-4xl sm:text-5xl md:text-6xl text-jade mb-4">Trust Signals</h2>
          <p className="text-charcoal/60 font-sans text-base sm:text-lg">Real closed deals. Real homeowners.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Jenkins"
            city="Austin, TX"
            quote="I inherited a property that needed major work. Jade gave me a fair offer in 24 hours and we closed in two weeks. Professional from start to finish."
          />
          <TestimonialCard
            name="Michael T."
            city="Phoenix, AZ"
            quote="Avoided all the open house headache. The price they offered was exactly what I got at closing. Zero hidden fees."
          />
          <TestimonialCard
            name="David & Elena R."
            city="Denver, CO"
            quote="We needed to relocate quickly for a job. The freedom to pick our exact closing date was incredible. Seamless digital process."
          />
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-drama italic text-4xl sm:text-5xl text-jade mb-4">The Comparison</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-charcoal/10">
          <div className="bg-cream p-8 sm:p-12">
            <h3 className="font-outfit text-xl sm:text-2xl text-charcoal/50 mb-6 sm:mb-8 font-medium">Traditional Sale</h3>
            <ul className="space-y-4 sm:space-y-6">
              {[
                "Agent commissions (6%)",
                "Months on market",
                "Costly repairs required",
                "Uncertain closing date",
                "Invasive open houses"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4 text-charcoal/60">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 shrink-0" />
                  <span className="text-base sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-jade text-white p-8 sm:p-12">
            <h3 className="font-outfit text-xl sm:text-2xl text-gold mb-6 sm:mb-8 font-semibold">Jade Properties</h3>
            <ul className="space-y-4 sm:space-y-6">
              {[
                "Zero fees or commissions",
                "Close in 30 Business days or less",
                "As-is purchase (no repairs)",
                "You choose closing date",
                "Completely private process"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-gold shrink-0" />
                  <span className="text-base sm:text-lg text-cream/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <MagneticButton
            onClick={() => document.getElementById('offer-portal').scrollIntoView({ behavior: 'smooth' })}
            className="bg-jade text-gold px-10 py-5 rounded-full text-xl shadow-xl shadow-jade/10 font-medium"
          >
            Get My Offer Now
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-jade text-cream rounded-t-[4rem] px-6 py-20 mt-[-2rem] relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-gold shadow-sm shrink-0"></div>
            <span className="font-outfit font-semibold text-3xl tracking-tight">Jade Properties</span>
          </div>
          <p className="font-drama italic text-2xl text-cream/70 mb-8">We buy problems.</p>

          <div className="flex items-center gap-3 text-sm text-gold font-mono bg-black/20 inline-flex px-4 py-2 rounded-lg border border-white/5 whitespace-normal break-words max-w-full flex-wrap">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>OFFERS_ACTIVE — 24HR_RESPONSE</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-outfit font-semibold text-gold tracking-widest text-sm mb-4">NAVIGATION</h4>
          <a href="#how-it-works" className="text-cream/70 hover:text-white transition-colors">How It Works</a>
          <a href="#philosophy" className="text-cream/70 hover:text-white transition-colors">Philosophy</a>
          <a href="#process" className="text-cream/70 hover:text-white transition-colors">Process</a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-outfit font-semibold text-gold tracking-widest text-sm mb-4">CONTACT & LEGAL</h4>
          <span className="text-cream/70 cursor-not-allowed">hello@jadeproperties.com</span>
          <span className="text-cream/70 cursor-not-allowed">1-800-JADE-NOW</span>
          <div className="h-4"></div>
          <a href="/privacy" className="text-cream/40 text-sm hover:text-white transition-colors">Privacy Policy</a>
          <a href="/sms-terms" className="text-cream/40 text-sm hover:text-white transition-colors">SMS Terms</a>
          <a href="/consent.html" className="text-cream/40 text-sm hover:text-white transition-colors">Communication Consent Policy</a>
        </div>
      </div>
    </footer>
  );
};

const ConsentPage = () => {
  return (
    <div className="min-h-screen bg-cream flex flex-col pb-[10vh]">
      {/* Dark background for navbar visibility */}
      <div className="w-full h-40 bg-jade/90 rounded-b-[2rem] shrink-0"></div>

      <div className="flex-1 max-w-4xl mx-auto px-6 pb-20 -mt-16 w-full z-10">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-charcoal/5">
          <h1 className="font-drama italic text-4xl sm:text-5xl text-jade mb-8 border-b border-charcoal/5 pb-8">Communication Consent Policy</h1>
          <div className="font-sans text-base sm:text-lg text-charcoal/70 space-y-6 leading-relaxed">
            <p>
              By submitting your information through any form or lead source associated with Jade Properties Group LLC, you agree to receive calls and text messages from Jade Properties Group LLC regarding property-related inquiries, offers, and updates. This may include follow-up messages about selling your property or related services you have expressed interest in.
            </p>
            <p>
              Message and data rates may apply. You can opt out at any time by replying STOP to any text message we send or by contacting us directly to be removed.
            </p>
            <p>
              Consent is not a condition of purchase or of doing business with Jade Properties Group LLC. Some leads may originate from third-party partners such as PropertyLeads.com, who pass your information to us after you request to be contacted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const path = window.location.pathname;

  if (path === '/consent') {
    return (
      <div className="relative overflow-x-hidden w-full max-w-[100vw] bg-cream">
        <Navbar />
        <ConsentPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Philosophy />
      <Process />
      <FormSection />
      <SocialProof />
      <Comparison />
      <Footer />
    </div>
  );
}
