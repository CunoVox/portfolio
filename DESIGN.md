# Portfolio visual system

Approved direction: user explicitly requested the layout of https://www.rakeshgupta.co.in/. Use monochrome surfaces, a split hero with a circular VH monogram, centered section headings, an experience panel, a two-column skills grid and overview strip, image-led project cards, education panels, and a centered contact form. Keep the user's own factual content. Omit GitHub activity and certifications without supplied evidence.

Typography: self-hosted Be Vietnam Pro via Fontsource, Latin and Vietnamese subsets. Weights 400/500/600/700. Display tracking no tighter than -0.04em.

Colors: light background #ffffff; foreground #17191e; soft surface #f2f4f7; muted #596273; border #e1e5eb. Dark background #14161b; foreground #eef0f5; soft surface #20242d; muted #a6afbf; border #343943. Theme preference is remembered.

Layout: maximum 1200px content width. Order: hero, experience, skills, projects, education/about, contact. Wisdom/E-Learning is first in the two-column project grid, HaoBox second. At 780px grids collapse to one column and navigation becomes a disclosure. No horizontal scrolling at 320px.

Interaction: Vietnamese default, remembered VI/EN preference, localized metadata and HTML lang; local PDF downloads explicitly identified as Vietnamese. Motion handles section reveals, floating monogram and reading progress. A timer-based typewriter rotates verified role labels. CSS adds card/image/social hover; reduced-motion disables decorative movement and typewriter. Navigation highlights the visible section. Project filters switch between all/team/personal. Contact form opens an email client via mailto. GitHub/LinkedIn links appear in header, hero and footer; GitHub contributions load from the public GitHub Contributions API with loading, retry and fallback profile link. Visible keyboard focus and Escape closes mobile navigation.

Assets: public/images/haobox.png is the public HaoBox promotional image. public/images/wisdom-cover-v2.png is an AI-designed preview based on a screenshot of the live Wisdom hero, preserving its white/cyan identity and recognizable interface. Captions distinguish it from an unedited screenshot. The previous conceptual cover is retained but no longer referenced. CVs in public/cv are supplied Vietnamese documents. No portrait supplied.
