<>
  <h2 className="text-2xl text-white">Who We Are</h2>

  <p>
    Arambhik Academy is a concept-driven learning institute for CBSE students from Class 6 to 10, where understanding comes before memorisation. We believe education should build clarity, confidence, and curiosity — not pressure.
  </p>

  <motion.div
    initial={false}
    animate={{ height: readMore ? 'auto' : 0, opacity: readMore ? 1 : 0 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="overflow-hidden space-y-4"
  >
    <p>
      Our teaching model combines structured preparation, engaging classroom sessions, and meaningful post-class practice. Small batch sizes ensure personal attention, regular feedback, and strong mentor support for every student.
    </p>

    <p>
      Students learn through dedicated science and computer labs where experiments, demonstrations, and hands-on activities turn theory into real understanding. Practical learning encourages curiosity and application-based thinking aligned with the CBSE curriculum.
    </p>

    <p>
      At Arambhik Academy, we don’t just prepare students for exams — we help them think independently, build discipline, and grow with confidence. Every concept is taught with purpose, and every child is guided with care.
    </p>
  </motion.div>

  <button
    onClick={() => setReadMore(!readMore)}
    className="inline-flex items-center space-x-2 text-accent-300 hover:text-accent-200 font-semibold group"
  >
    <span>{readMore ? 'Read Less' : 'Read More'}</span>
    <ChevronDown className={`h-4 w-4 transition-transform ${readMore ? 'rotate-180' : ''}`} />
  </button>
</>
