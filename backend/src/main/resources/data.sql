-- ============================================================
-- APEX GARAGE — Seed Data
-- ============================================================

-- CARS
INSERT INTO cars (make, model, year, model_key, thumbnail_url, glb_path, attachment_nodes, description)
VALUES
  ('Toyota',     'Supra',              1993, 'supra_mk4',    '/textures/thumbnails/supra_mk4.png',    '/models/supra_mk4.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'The legend. 2JZ-GTE, 320hp stock, infinite headroom for boost.'),
  ('Mitsubishi', 'Lancer Evolution IX', 2005, 'evo_ix',      '/textures/thumbnails/evo_ix.png',       '/models/evo_ix.glb',       'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Pinnacle of all-wheel-drive rally tech put on the street.'),
  ('Honda',      'NSX',                1991, 'nsx_na1',      '/textures/thumbnails/nsx_na1.png',      '/models/nsx_na1.glb',      'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Ayrton Senna-certified. Mid-engine V6 with a chassis that redefined the sports car.'),
  ('Honda',      'S2000',              2000, 's2000_ap1',    '/textures/thumbnails/s2000_ap1.png',    '/models/s2000_ap1.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'F20C screams to 9000 RPM. The perfect roadster.'),
  ('Nissan',     'Silvia',             1999, 'silvia_s15',   '/textures/thumbnails/silvia_s15.png',   '/models/silvia_s15.glb',   'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Last of the Silvias. SR20DET in a perfectly balanced drift platform.'),
  ('Mazda',      'RX-7',               1993, 'rx7_fd3s',     '/textures/thumbnails/rx7_fd3s.png',     '/models/rx7_fd3s.glb',     'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Sequential twin-turbo 13B-REW. The most beautiful JDM ever built.'),
  ('Subaru',     'Impreza WRX STI',    2004, 'wrx_sti_gd',   '/textures/thumbnails/wrx_sti_gd.png',   '/models/wrx_sti_gd.glb',   'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'EJ207, Prodrive wing, STI pink. Rally-bred road warrior.'),
  ('Toyota',     'Corolla AE86',       1985, 'ae86_trueno',  '/textures/thumbnails/ae86_trueno.png',  '/models/ae86_trueno.glb',  'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'The Trueno. Lightweight FR perfection. Tofu delivery optional.');

-- ============================================================
-- PARTS — Body Kits
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Rocket Bunny V2 Front Bumper',  'Rocket Bunny / TRA Kyoto', 'body_kits', 'supra_mk4,rx7_fd3s,silvia_s15', 1850.00, '/textures/parts/rocketbunny_front.png', '{"x":0,"y":0,"z":0}', 'bumper_front', 'Aggressive wide-body front with intercooler opening.'),
  ('Rocket Bunny V2 Rear Bumper',   'Rocket Bunny / TRA Kyoto', 'body_kits', 'supra_mk4,rx7_fd3s,silvia_s15', 1650.00, '/textures/parts/rocketbunny_rear.png',  '{"x":0,"y":0,"z":0}', 'bumper_rear',  'Full diffuser rear bumper. Pairs with V2 front.'),
  ('Varis Type-R Front Bumper',     'Varis',                    'body_kits', 'evo_ix,wrx_sti_gd',             2200.00, '/textures/parts/varis_front.png',        '{"x":0,"y":0,"z":0}', 'bumper_front', 'Rally-inspired carbon-aero front end.'),
  ('Bomex Full Aero Side Skirts',   'Bomex',                    'body_kits', 'supra_mk4,silvia_s15,s2000_ap1',1100.00, '/textures/parts/bomex_skirts.png',       '{"x":0,"y":0,"z":0}', 'side_skirt_l', 'Clean low-profile side skirts.'),
  ('J''s Racing Full Aero Kit',    'J''s Racing',              'body_kits', 'nsx_na1,s2000_ap1',             3400.00, '/textures/parts/jsracing_aero.png',      '{"x":0,"y":0,"z":0}', 'bumper_front', 'Track-focused full aero. FRP construction.'),
  ('Origin Lab Type-2 Front Bumper','Origin Lab',               'body_kits', 'ae86_trueno,silvia_s15',        980.00,  '/textures/parts/origin_front.png',       '{"x":0,"y":0,"z":0}', 'bumper_front', 'Drift-style deep lip with fog light delete.'),
  ('C-West N1 Front Bumper',        'C-West',                   'body_kits', 'rx7_fd3s,supra_mk4',            2100.00, '/textures/parts/cwest_front.png',        '{"x":0,"y":0,"z":0}', 'bumper_front', 'N1 racing-spec with large lower duct.'),
  ('RE-Amemiya Rear Bumper',        'RE-Amemiya',               'body_kits', 'rx7_fd3s',                      1750.00, '/textures/parts/reamemiya_rear.png',     '{"x":0,"y":0,"z":0}', 'bumper_rear',  'Factory-look rear with quad exhaust cutout.');

-- ============================================================
-- PARTS — Wheels & Tires (10 JDM brands)
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Volk Racing TE37SL 17"',        'Volk Racing',   'wheels', 'supra_mk4,silvia_s15,rx7_fd3s,ae86_trueno,s2000_ap1,nsx_na1', 3200.00, '/textures/parts/te37sl.png',          '{"x":0,"y":0,"z":0}', 'wheel_fl', 'RAYS forged monoblock. 6-spoke icon. The benchmark.'),
  ('Volk Racing CE28N 16"',         'Volk Racing',   'wheels', 'ae86_trueno,s2000_ap1,silvia_s15',                             2800.00, '/textures/parts/ce28n.png',           '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Lightweight CE-28 8-spoke in classic club racer spec.'),
  ('Work Meister S1 18"',           'Work Wheels',   'wheels', 'supra_mk4,rx7_fd3s,nsx_na1,silvia_s15',                       5200.00, '/textures/parts/meister_s1.png',      '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Three-piece forged. Concave face. Pure luxury.'),
  ('Enkei RPF1 17"',                'Enkei',         'wheels', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd,s2000_ap1,ae86_trueno',1800.00, '/textures/parts/rpf1.png',            '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Lightweight competition 10-spoke. Flow-formed 17x9.'),
  ('Advan GT 18"',                  'Advan Racing',  'wheels', 'supra_mk4,rx7_fd3s,nsx_na1',                                  3400.00, '/textures/parts/advan_gt.png',        '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Full-face 7-spoke GT. Advan motorsport pedigree.'),
  ('SSR Professor SP1 18"',         'SSR',           'wheels', 'supra_mk4,nsx_na1,rx7_fd3s',                                  4800.00, '/textures/parts/ssr_professor.png',   '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Deep dish split-rim 5-spoke. Show quality finish.'),
  ('Gram Lights 57DR 17"',          'Rays Gram Lights','wheels','wrx_sti_gd,evo_ix,ae86_trueno,silvia_s15',                   1600.00, '/textures/parts/57dr.png',            '{"x":0,"y":0,"z":0}', 'wheel_fl', 'RAYS monoblock 12-spoke cast. Value-to-weight king.'),
  ('BBS LM 18"',                    'BBS',           'wheels', 'supra_mk4,nsx_na1,rx7_fd3s,s2000_ap1',                       5600.00, '/textures/parts/bbs_lm.png',          '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Two-piece forged. Gold spoke option. German precision.'),
  ('Rota Grid 17"',                 'Rota',          'wheels', 'ae86_trueno,silvia_s15,evo_ix,wrx_sti_gd,s2000_ap1',         680.00,  '/textures/parts/rota_grid.png',        '{"x":0,"y":0,"z":0}', 'wheel_fl', '8-spoke mesh style. Budget-friendly track day wheel.'),
  ('Watanabe 8-Spoke 15"',          'Watanabe',      'wheels', 'ae86_trueno',                                                 1200.00, '/textures/parts/watanabe.png',         '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Classic 8-spoke star. The definitive AE86 wheel.');

-- ============================================================
-- PARTS — Suspension & Stance
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Tein Flex A Coilovers',     'Tein',   'suspension', 'supra_mk4,silvia_s15,rx7_fd3s,s2000_ap1,ae86_trueno', 1600.00, '/textures/parts/tein_flex.png',    '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Full adjustable coilover. 16-way damping.'),
  ('Cusco Zero-2A Coilovers',   'Cusco',  'suspension', 'wrx_sti_gd,evo_ix',                                   2100.00, '/textures/parts/cusco_zero2.png',  '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Pillow-ball top mount. Competition spec.'),
  ('HKS Hipermax S Coilovers',  'HKS',    'suspension', 'supra_mk4,rx7_fd3s,nsx_na1',                          2400.00, '/textures/parts/hks_hipermax.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Street/track dual-purpose. 30-step adjust.'),
  ('Tanabe NF210 Springs',      'Tanabe', 'suspension', 'supra_mk4,silvia_s15,s2000_ap1,ae86_trueno',          380.00,  '/textures/parts/tanabe_nf210.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Drop springs for mild stance without ride sacrifice.'),
  ('Stance XR1 Coilovers',      'Stance', 'suspension', 'silvia_s15,ae86_trueno,wrx_sti_gd,evo_ix',           1200.00, '/textures/parts/stance_xr1.png',   '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Budget-performance coilover with camber plates.');

-- ============================================================
-- PARTS — Exhaust
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('HKS Hi-Power Cat-Back',              'HKS',        'exhaust', 'supra_mk4,silvia_s15,s2000_ap1',                  1100.00, '/textures/parts/hks_catback.png',   '{"x":0,"y":0,"z":0}', 'exhaust_tip', '70mm dual tip. Deep tone without drone.'),
  ('Tomei Expreme Ti Cat-Back',          'Tomei',      'exhaust', 'supra_mk4,rx7_fd3s,silvia_s15,evo_ix,wrx_sti_gd', 1800.00, '/textures/parts/tomei_ti.png',      '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Titanium full system. Weight savings + race sound.'),
  ('Fujitsubo Authorize R Cat-Back',     'Fujitsubo',  'exhaust', 's2000_ap1,nsx_na1,ae86_trueno',                   1200.00, '/textures/parts/fujitsubo.png',      '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'JDM legend. Clean single exit. High-rev scream.'),
  ('GReddy Revolution RS Dual Cat-Back', 'GReddy',     'exhaust', 'supra_mk4,rx7_fd3s,silvia_s15',                   1350.00, '/textures/parts/greddy_rs.png',     '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Dual-exit twin tip. Polished stainless.'),
  ('RE-Amemiya SP-IIx Cat-Back',         'RE-Amemiya', 'exhaust', 'rx7_fd3s',                                        1600.00, '/textures/parts/reamemiya_sp.png',  '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Rotary-tuned exhaust. Quad tip for the FD.'),
  ('Borla S-Type Cat-Back',              'Borla',      'exhaust', 'supra_mk4,nsx_na1,s2000_ap1',                     1450.00, '/textures/parts/borla_stype.png',   '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'ATAK round tip. Aggressive rumble all-RPM.');

-- ============================================================
-- PARTS — Spoilers & Wings
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Voltex Type-1 GT Wing',          'Voltex',      'spoilers', 'supra_mk4,rx7_fd3s,nsx_na1,silvia_s15,evo_ix,wrx_sti_gd', 2800.00, '/textures/parts/voltex_gt.png',     '{"x":0,"y":0.1,"z":0}',  'wing_rear', 'Swan neck mount GT wing. Full carbon. Adjustable AoA.'),
  ('Rocket Bunny Ducktail',          'Rocket Bunny','spoilers', 'supra_mk4,silvia_s15,rx7_fd3s',                            780.00,  '/textures/parts/rb_ducktail.png',   '{"x":0,"y":0.05,"z":0}', 'wing_rear', 'Low-profile duck bill. Subtle OEM+ look.'),
  ('Cusco Trunk Lip Spoiler',        'Cusco',       'spoilers', 'evo_ix,wrx_sti_gd,s2000_ap1',                              420.00,  '/textures/parts/cusco_lip.png',     '{"x":0,"y":0.03,"z":0}', 'wing_rear', 'OEM-style trunk lip. FRP. Tasteful aero.'),
  ('TRD Aerostabilizing Fin Spoiler','TRD',         'spoilers', 'ae86_trueno,supra_mk4',                                    560.00,  '/textures/parts/trd_fin.png',       '{"x":0,"y":0.04,"z":0}', 'wing_rear', 'Toyota TRD trunk fin. Factory race aesthetic.'),
  ('RE-Amemiya Racing Wing',         'RE-Amemiya',  'spoilers', 'rx7_fd3s',                                                 1900.00, '/textures/parts/reamemiya_wing.png','{"x":0,"y":0.12,"z":0}', 'wing_rear', 'FD-specific high-mount wing. Full CFRP.');

-- ============================================================
-- PARTS — Liveries / Paint Wraps
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('3M Carbon Fiber Vinyl Wrap',    '3M',            'paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno', 650.00,  '/textures/parts/carbon_wrap.png',   '{}', 'hood', 'Forged carbon texture. Self-healing polymer.'),
  ('Avery SW900 Matte Black Wrap',  'Avery Dennison','paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno', 550.00,  '/textures/parts/matte_black.png',   '{}', 'hood', 'Dead flat matte black. Velvet texture finish.'),
  ('Oracal 970 Chrome Silver Wrap', 'Oracal',        'paint', 'supra_mk4,nsx_na1,rx7_fd3s,silvia_s15',                                          1100.00, '/textures/parts/chrome_silver.png', '{}', 'hood', 'Mirrored chrome. Show-stopper finish.'),
  ('Inozetek Gloss Candy Blue',     'Inozetek',      'paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno', 780.00,  '/textures/parts/candy_blue.png',    '{}', 'hood', 'Deep gloss candy blue. Colour-shifting in light.'),
  ('KPMF Brushed Titanium Wrap',    'KPMF',          'paint', 'supra_mk4,nsx_na1,rx7_fd3s,evo_ix',                                              950.00,  '/textures/parts/brushed_ti.png',    '{}', 'hood', 'Metallic brushed titanium. Clean industrial look.');

-- ============================================================
-- PARTS — Lights & Tint
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Kouki Euro Headlights',        'OEM (Kouki)', 'lights', 'silvia_s15',                                                                     1200.00, '/textures/parts/kouki_headlights.png', '{}', 'bumper_front', 'S15 Kouki face conversion. Clean projector housings.'),
  ('Depo Euro Altezza Tails',      'Depo',        'lights', 'ae86_trueno,silvia_s15',                                                          380.00,  '/textures/parts/altezza_tails.png',    '{}', 'bumper_rear',  'Clear/smoke Altezza style. Euro look.'),
  ('HID Japan Projector Retrofit', 'HID Japan',   'lights', 'supra_mk4,rx7_fd3s,nsx_na1',                                                      450.00,  '/textures/parts/hid_projector.png',    '{}', 'bumper_front', 'Bi-xenon projector retrofit kit. 5000K sharp cutoff.'),
  ('Llumar 35% Window Tint',       'Llumar',      'lights', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno',  250.00,  '/textures/parts/tint_35.png',          '{}', 'hood', '35% VLT ceramic film. UV block. No purple fade.'),
  ('Llumar 20% Window Tint',       'Llumar',      'lights', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno',  280.00,  '/textures/parts/tint_20.png',          '{}', 'hood', '20% VLT. Dark limo tint. Premium ceramic.');

-- ============================================================
-- PARTS — Engine Bay
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('HKS Racing Suction Cold Air Intake',    'HKS',       'engine_bay', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd', 380.00,  '/textures/parts/hks_intake.png',    '{}', 'hood',        '+15hp sound and look. Short ram pod filter.'),
  ('GReddy Type-12C Front Mount Intercooler','GReddy',   'engine_bay', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd', 1100.00, '/textures/parts/greddy_fmic.png',   '{}', 'bumper_front','Full front-mount bar-and-plate FMIC. Core: 600x300x76mm.'),
  ('TRA Kyoto Carbon Engine Cover',         'TRA Kyoto', 'engine_bay', 'supra_mk4,rx7_fd3s,nsx_na1',             650.00,  '/textures/parts/carbon_cover.png',  '{}', 'hood',        'Dry-carbon valve/engine cover. Weight-conscious aesthetics.'),
  ('Cusco Strut Tower Brace',               'Cusco',     'engine_bay', 'evo_ix,wrx_sti_gd,s2000_ap1,ae86_trueno',320.00,  '/textures/parts/cusco_strut.png',   '{}', 'hood',        'Aluminium front strut bar. Stiffens firewall under load.'),
  ('Nismo Titanium Cam Cover',              'Nismo',     'engine_bay', 'silvia_s15',                              580.00,  '/textures/parts/nismo_camcover.png','{}', 'hood',        'SR20DET titanium-finish cam cover. Nismo blue bolts.');
