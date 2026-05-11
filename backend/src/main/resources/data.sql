-- ============================================================
-- APEX GARAGE — Seed Data
-- ============================================================

-- CARS — JDM
INSERT INTO cars (make, model, year, model_key, thumbnail_url, glb_path, attachment_nodes, description, culture, base_hp, base_tq, weight_kg, redline_rpm)
VALUES
  ('Toyota',     'Supra',               1993, 'supra_mk4',    '/textures/thumbnails/supra_mk4.png',    '/models/supra_mk4.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'The legend. 2JZ-GTE, 320hp stock, infinite headroom for boost.',         'JDM', 320, 430, 1520, 6500),
  ('Mitsubishi', 'Lancer Evolution IX',  2005, 'evo_ix',       '/textures/thumbnails/evo_ix.png',       '/models/evo_ix.glb',       'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Pinnacle of all-wheel-drive rally tech put on the street.',               'JDM', 286, 392, 1410, 7000),
  ('Honda',      'NSX',                  1991, 'nsx_na1',      '/textures/thumbnails/nsx_na1.png',      '/models/nsx_na1.glb',      'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Ayrton Senna-certified. Mid-engine V6 with a chassis that redefined the sports car.', 'JDM', 270, 284, 1370, 8000),
  ('Honda',      'S2000',                2000, 's2000_ap1',    '/textures/thumbnails/s2000_ap1.png',    '/models/s2000_ap1.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'F20C screams to 9000 RPM. The perfect roadster.',                         'JDM', 240, 222, 1270, 9000),
  ('Nissan',     'Silvia',               1999, 'silvia_s15',   '/textures/thumbnails/silvia_s15.png',   '/models/silvia_s15.glb',   'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Last of the Silvias. SR20DET in a perfectly balanced drift platform.',    'JDM', 250, 274, 1240, 7500),
  ('Mazda',      'RX-7',                 1993, 'rx7_fd3s',     '/textures/thumbnails/rx7_fd3s.png',     '/models/rx7_fd3s.glb',     'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'Sequential twin-turbo 13B-REW. The most beautiful JDM ever built.',       'JDM', 255, 294, 1280, 8000),
  ('Subaru',     'Impreza WRX STI',      2004, 'wrx_sti_gd',   '/textures/thumbnails/wrx_sti_gd.png',   '/models/wrx_sti_gd.glb',   'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'EJ207, Prodrive wing, STI pink. Rally-bred road warrior.',                'JDM', 300, 407, 1495, 6500),
  ('Toyota',     'Corolla AE86',         1985, 'ae86_trueno',  '/textures/thumbnails/ae86_trueno.png',  '/models/ae86_trueno.glb',  'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'The Trueno. Lightweight FR perfection. Tofu delivery optional.',          'JDM', 128, 152,  940, 7800);

-- CARS — Euro
INSERT INTO cars (make, model, year, model_key, thumbnail_url, glb_path, attachment_nodes, description, culture, base_hp, base_tq, weight_kg, redline_rpm)
VALUES
  ('BMW',           'M3',            2001, 'bmw_e46_m3',        '/textures/thumbnails/bmw_e46_m3.png',      '/models/bmw_e46_m3.glb',      'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'S54 inline-six. 338hp. The last analog M3 — pure mechanical feedback.',  'Euro', 338, 365, 1570, 8000),
  ('Audi',          'TT',            1998, 'audi_tt_8n',        '/textures/thumbnails/audi_tt_8n.png',      '/models/audi_tt_8n.glb',      'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '1.8T quattro AWD. Bauhaus styling that aged perfectly.',                  'Euro', 225, 280, 1320, 6200),
  ('Volkswagen',    'Golf GTI',      2002, 'golf_gti_mk4',     '/textures/thumbnails/golf_gti_mk4.png',    '/models/golf_gti_mk4.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '1.8T 20V. The quintessential hot hatch. 337-style tuning unlocks serious power.', 'Euro', 180, 235, 1320, 6500),
  ('Porsche',       '911 Carrera',   2000, 'porsche_911_996',  '/textures/thumbnails/porsche_911_996.png', '/models/porsche_911_996.glb', 'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '3.4L flat-six. 300hp. Rear-engine balance that only Porsche gets right.',  'Euro', 300, 350, 1345, 7200),
  ('Mercedes-Benz', 'C63 AMG',       2012, 'mercedes_c63_w204','/textures/thumbnails/mercedes_c63_w204.png','/models/mercedes_c63_w204.glb','wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '6.3L M156 V8. 457hp hand-built. AMG''s masterpiece wagon-killer saloon.',  'Euro', 457, 600, 1720, 7200);

-- CARS — Muscle
INSERT INTO cars (make, model, year, model_key, thumbnail_url, glb_path, attachment_nodes, description, culture, base_hp, base_tq, weight_kg, redline_rpm)
VALUES
  ('Ford',      'Mustang GT',     1997, 'mustang_gt_sn95',   '/textures/thumbnails/mustang_gt_sn95.png',   '/models/mustang_gt_sn95.glb',   'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '4.6L 2V modular V8. The last of the classic pushrod feel. Fox platform DNA.', 'Muscle', 215, 285, 1530, 5500),
  ('Chevrolet', 'Camaro SS',      2002, 'camaro_ss_f4',      '/textures/thumbnails/camaro_ss_f4.png',      '/models/camaro_ss_f4.glb',      'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'LS1 V8. 325hp. F-body platform. Lightweight for a muscle car, fast for everything.', 'Muscle', 325, 427, 1680, 5600),
  ('Dodge',     'Challenger SRT', 2015, 'challenger_srt',    '/textures/thumbnails/challenger_srt.png',    '/models/challenger_srt.glb',    'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '6.4L 392 HEMI. 485hp. Modern retro muscle done right.',                   'Muscle', 485, 644, 1970, 6200),
  ('Ford',      'F-150 Raptor',   2017, 'f150_raptor',       '/textures/thumbnails/f150_raptor.png',       '/models/f150_raptor.glb',       'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', '3.5L EcoBoost V6. 450hp. Fox shocks. Flies over desert at 100mph.',       'Muscle', 450, 691, 2265, 5500),
  ('Pontiac',   'GTO',            2004, 'pontiac_gto_2004',  '/textures/thumbnails/pontiac_gto_2004.png',  '/models/pontiac_gto_2004.glb',  'wheel_fl,wheel_fr,wheel_rl,wheel_rr,bumper_front,bumper_rear,side_skirt_l,side_skirt_r,wing_rear,exhaust_tip,hood', 'LS1 V8. 350hp. Holden Monaro in a tux. Sleeper muscle that nobody saw coming.', 'Muscle', 350, 500, 1710, 6000);

-- ============================================================
-- PARTS — Body Kits
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Rocket Bunny V2 Front Bumper',   'Rocket Bunny / TRA Kyoto', 'body_kits', 'supra_mk4,rx7_fd3s,silvia_s15',                                1850.00, '/textures/parts/rocketbunny_front.png', '{"x":0,"y":0,"z":0}', 'bumper_front', 'Aggressive wide-body front with intercooler opening.'),
  ('Rocket Bunny V2 Rear Bumper',    'Rocket Bunny / TRA Kyoto', 'body_kits', 'supra_mk4,rx7_fd3s,silvia_s15',                                1650.00, '/textures/parts/rocketbunny_rear.png',  '{"x":0,"y":0,"z":0}', 'bumper_rear',  'Full diffuser rear bumper. Pairs with V2 front.'),
  ('Varis Type-R Front Bumper',      'Varis',                    'body_kits', 'evo_ix,wrx_sti_gd',                                            2200.00, '/textures/parts/varis_front.png',       '{"x":0,"y":0,"z":0}', 'bumper_front', 'Rally-inspired carbon-aero front end.'),
  ('Bomex Full Aero Side Skirts',    'Bomex',                    'body_kits', 'supra_mk4,silvia_s15,s2000_ap1',                               1100.00, '/textures/parts/bomex_skirts.png',      '{"x":0,"y":0,"z":0}', 'side_skirt_l', 'Clean low-profile side skirts.'),
  ('J''s Racing Full Aero Kit',     'J''s Racing',              'body_kits', 'nsx_na1,s2000_ap1',                                            3400.00, '/textures/parts/jsracing_aero.png',     '{"x":0,"y":0,"z":0}', 'bumper_front', 'Track-focused full aero. FRP construction.'),
  ('Origin Lab Type-2 Front Bumper', 'Origin Lab',               'body_kits', 'ae86_trueno,silvia_s15',                                        980.00, '/textures/parts/origin_front.png',      '{"x":0,"y":0,"z":0}', 'bumper_front', 'Drift-style deep lip with fog light delete.'),
  ('C-West N1 Front Bumper',         'C-West',                   'body_kits', 'rx7_fd3s,supra_mk4',                                           2100.00, '/textures/parts/cwest_front.png',       '{"x":0,"y":0,"z":0}', 'bumper_front', 'N1 racing-spec with large lower duct.'),
  ('RE-Amemiya Rear Bumper',         'RE-Amemiya',               'body_kits', 'rx7_fd3s',                                                     1750.00, '/textures/parts/reamemiya_rear.png',    '{"x":0,"y":0,"z":0}', 'bumper_rear',  'Factory-look rear with quad exhaust cutout.'),
  ('Caractere Front Spoiler',        'Caractere',                'body_kits', 'golf_gti_mk4,audi_tt_8n',                                       820.00, '/textures/parts/caractere_front.png',   '{"x":0,"y":0,"z":0}', 'bumper_front', 'Subtle deep-lip Euro front. OEM+ fitment.'),
  ('M Performance Front Splitter',   'BMW M Performance',        'body_kits', 'bmw_e46_m3',                                                    650.00, '/textures/parts/bmw_splitter.png',      '{"x":0,"y":0,"z":0}', 'bumper_front', 'Carbon blade splitter. M3 CSL-inspired.'),
  ('Renntech Wide Body Kit',         'Renntech',                 'body_kits', 'mercedes_c63_w204',                                            3800.00, '/textures/parts/renntech_widebody.png', '{"x":0,"y":0,"z":0}', 'bumper_front', 'Factory-plus wide-body. Adds 40mm per side.'),
  ('Saleen S281 Front Fascia',       'Saleen',                   'body_kits', 'mustang_gt_sn95',                                               880.00, '/textures/parts/saleen_front.png',      '{"x":0,"y":0,"z":0}', 'bumper_front', 'S281-spec aggressive front with side inlets.'),
  ('SLP ZL1 Rear Bumper',            'SLP',                      'body_kits', 'camaro_ss_f4',                                                  720.00, '/textures/parts/slp_rear.png',          '{"x":0,"y":0,"z":0}', 'bumper_rear',  'ZL1-inspired rear with centre diffuser.'),
  ('Hellcat Hood and Splitter',      'Mopar',                    'body_kits', 'challenger_srt',                                               1100.00, '/textures/parts/mopar_hood.png',        '{"x":0,"y":0,"z":0}', 'bumper_front', 'Hellcat front conversion with functional hood scoop.');

-- ============================================================
-- PARTS — Wheels & Tires (JDM + Euro + Muscle)
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Volk Racing TE37SL 17"',   'Volk Racing',      'wheels', 'supra_mk4,silvia_s15,rx7_fd3s,ae86_trueno,s2000_ap1,nsx_na1',                      3200.00, '/textures/parts/te37sl.png',        '{"x":0,"y":0,"z":0}', 'wheel_fl', 'RAYS forged monoblock. 6-spoke icon. The benchmark.'),
  ('Volk Racing CE28N 16"',    'Volk Racing',      'wheels', 'ae86_trueno,s2000_ap1,silvia_s15',                                                  2800.00, '/textures/parts/ce28n.png',         '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Lightweight CE-28 8-spoke in classic club racer spec.'),
  ('Work Meister S1 18"',      'Work Wheels',      'wheels', 'supra_mk4,rx7_fd3s,nsx_na1,silvia_s15,bmw_e46_m3,porsche_911_996',                  5200.00, '/textures/parts/meister_s1.png',    '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Three-piece forged. Concave face. Pure luxury.'),
  ('Enkei RPF1 17"',           'Enkei',            'wheels', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd,s2000_ap1,ae86_trueno,golf_gti_mk4',         1800.00, '/textures/parts/rpf1.png',          '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Lightweight competition 10-spoke. Flow-formed 17x9.'),
  ('Advan GT 18"',             'Advan Racing',     'wheels', 'supra_mk4,rx7_fd3s,nsx_na1,bmw_e46_m3,porsche_911_996',                            3400.00, '/textures/parts/advan_gt.png',      '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Full-face 7-spoke GT. Advan motorsport pedigree.'),
  ('SSR Professor SP1 18"',    'SSR',              'wheels', 'supra_mk4,nsx_na1,rx7_fd3s',                                                        4800.00, '/textures/parts/ssr_professor.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Deep dish split-rim 5-spoke. Show quality finish.'),
  ('Gram Lights 57DR 17"',     'Rays Gram Lights', 'wheels', 'wrx_sti_gd,evo_ix,ae86_trueno,silvia_s15',                                         1600.00, '/textures/parts/57dr.png',          '{"x":0,"y":0,"z":0}', 'wheel_fl', 'RAYS monoblock 12-spoke cast. Value-to-weight king.'),
  ('BBS LM 18"',               'BBS',              'wheels', 'supra_mk4,nsx_na1,rx7_fd3s,s2000_ap1,bmw_e46_m3,porsche_911_996,mercedes_c63_w204', 5600.00, '/textures/parts/bbs_lm.png',        '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Two-piece forged. Gold spoke option. German precision.'),
  ('Rota Grid 17"',            'Rota',             'wheels', 'ae86_trueno,silvia_s15,evo_ix,wrx_sti_gd,s2000_ap1',                                 680.00, '/textures/parts/rota_grid.png',     '{"x":0,"y":0,"z":0}', 'wheel_fl', '8-spoke mesh style. Budget-friendly track day wheel.'),
  ('Watanabe 8-Spoke 15"',     'Watanabe',         'wheels', 'ae86_trueno',                                                                       1200.00, '/textures/parts/watanabe.png',      '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Classic 8-spoke star. The definitive AE86 wheel.'),
  ('OZ Ultraleggera 18"',      'OZ Racing',        'wheels', 'bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204',              2900.00, '/textures/parts/oz_ultraleggera.png','{"x":0,"y":0,"z":0}', 'wheel_fl', 'Italian forged 10-spoke. The Euro tuner standard.'),
  ('BBS CH-R 19"',             'BBS',              'wheels', 'bmw_e46_m3,mercedes_c63_w204,porsche_911_996',                                       4200.00, '/textures/parts/bbs_chr.png',       '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Flow-formed mesh. OEM fit for German cars.'),
  ('CCW Classic 18"',          'CCW Wheels',       'wheels', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004',                       2200.00, '/textures/parts/ccw_classic.png',   '{"x":0,"y":0,"z":0}', 'wheel_fl', 'American billet 5-spoke. Polished or black options.'),
  ('American Racing Torq 17"', 'American Racing',  'wheels', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004,f150_raptor',           1400.00, '/textures/parts/torq_thrust.png',   '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Torq-Thrust 5-spoke. Classic muscle heritage.'),
  ('Fuel Off-Road Assault 20"','Fuel',             'wheels', 'f150_raptor',                                                                        1800.00, '/textures/parts/fuel_assault.png',  '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Beadlock-capable 8-lug. Off-road spec for the Raptor.');

-- ============================================================
-- PARTS — Suspension & Stance
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Tein Flex A Coilovers',     'Tein',   'suspension', 'supra_mk4,silvia_s15,rx7_fd3s,s2000_ap1,ae86_trueno',         1600.00, '/textures/parts/tein_flex.png',    '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Full adjustable coilover. 16-way damping.'),
  ('Cusco Zero-2A Coilovers',   'Cusco',  'suspension', 'wrx_sti_gd,evo_ix',                                           2100.00, '/textures/parts/cusco_zero2.png',  '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Pillow-ball top mount. Competition spec.'),
  ('HKS Hipermax S Coilovers',  'HKS',    'suspension', 'supra_mk4,rx7_fd3s,nsx_na1',                                  2400.00, '/textures/parts/hks_hipermax.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Street/track dual-purpose. 30-step adjust.'),
  ('Tanabe NF210 Springs',      'Tanabe', 'suspension', 'supra_mk4,silvia_s15,s2000_ap1,ae86_trueno',                   380.00, '/textures/parts/tanabe_nf210.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Drop springs for mild stance without ride sacrifice.'),
  ('Stance XR1 Coilovers',      'Stance', 'suspension', 'silvia_s15,ae86_trueno,wrx_sti_gd,evo_ix',                   1200.00, '/textures/parts/stance_xr1.png',   '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Budget-performance coilover with camber plates.'),
  ('KW Variant 3 Coilovers',    'KW',     'suspension', 'bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204', 2800.00, '/textures/parts/kw_v3.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', 'German precision. Independent rebound/compression. The Euro benchmark.'),
  ('Bilstein B16 PSS10',        'Bilstein','suspension','bmw_e46_m3,golf_gti_mk4,audi_tt_8n',                           2200.00, '/textures/parts/bilstein_b16.png', '{"x":0,"y":0,"z":0}', 'wheel_fl', '10-click PSS10. OEM quality with adjustability.'),
  ('Eibach Multi-Pro-R2',       'Eibach', 'suspension', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004',1900.00, '/textures/parts/eibach_r2.png',    '{"x":0,"y":0,"z":0}', 'wheel_fl', 'Dual adjustable for street/strip. Muscle-car spec spring rates.'),
  ('Fox 2.5 Remote Reservoir',  'Fox',    'suspension', 'f150_raptor',                                                 3200.00, '/textures/parts/fox_25.png',       '{"x":0,"y":0,"z":0}', 'wheel_fl', '2.5" internal bypass. Factory replacement. +2" lift compatible.');

-- ============================================================
-- PARTS — Exhaust
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('HKS Hi-Power Cat-Back',              'HKS',        'exhaust', 'supra_mk4,silvia_s15,s2000_ap1',                             1100.00, '/textures/parts/hks_catback.png',     '{"x":0,"y":0,"z":0}', 'exhaust_tip', '70mm dual tip. Deep tone without drone.'),
  ('Tomei Expreme Ti Cat-Back',          'Tomei',      'exhaust', 'supra_mk4,rx7_fd3s,silvia_s15,evo_ix,wrx_sti_gd',           1800.00, '/textures/parts/tomei_ti.png',        '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Titanium full system. Weight savings + race sound.'),
  ('Fujitsubo Authorize R Cat-Back',     'Fujitsubo',  'exhaust', 's2000_ap1,nsx_na1,ae86_trueno',                              1200.00, '/textures/parts/fujitsubo.png',       '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'JDM legend. Clean single exit. High-rev scream.'),
  ('GReddy Revolution RS Dual Cat-Back', 'GReddy',     'exhaust', 'supra_mk4,rx7_fd3s,silvia_s15',                              1350.00, '/textures/parts/greddy_rs.png',       '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Dual-exit twin tip. Polished stainless.'),
  ('RE-Amemiya SP-IIx Cat-Back',         'RE-Amemiya', 'exhaust', 'rx7_fd3s',                                                   1600.00, '/textures/parts/reamemiya_sp.png',    '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Rotary-tuned exhaust. Quad tip for the FD.'),
  ('Borla ATAK Cat-Back',                'Borla',      'exhaust', 'supra_mk4,nsx_na1,s2000_ap1',                                1450.00, '/textures/parts/borla_atak.png',      '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'ATAK round tip. Aggressive rumble all-RPM.'),
  ('Eisenmann Race Cat-Back',            'Eisenmann',  'exhaust', 'bmw_e46_m3',                                                 1900.00, '/textures/parts/eisenmann_race.png',  '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Quad-tip titanium. S54 soundtrack amplified.'),
  ('Milltek Sport Non-Res Cat-Back',     'Milltek',    'exhaust', 'golf_gti_mk4,audi_tt_8n',                                   1100.00, '/textures/parts/milltek_sport.png',   '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Non-resonated 76mm stainless. Louder pop-and-bang.'),
  ('Akrapovic Slip-On Titanium',         'Akrapovic',  'exhaust', 'porsche_911_996,mercedes_c63_w204,bmw_e46_m3',              2800.00, '/textures/parts/akrapovic_slip.png',  '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Titanium slip-on. 4kg saving. European race note.'),
  ('Flowmaster American Thunder',        'Flowmaster', 'exhaust', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004', 680.00,'/textures/parts/flowmaster_at.png',  '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'The OG muscle rumble. Deep V8 bark with no drone.'),
  ('MagnaFlow Competition Cat-Back',     'MagnaFlow',  'exhaust', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004,f150_raptor', 950.00, '/textures/parts/magnaflow_comp.png', '{"x":0,"y":0,"z":0}', 'exhaust_tip', 'Stainless straight-through muffler. Universally aggressive.');

-- ============================================================
-- PARTS — Spoilers & Wings
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Voltex Type-1 GT Wing',           'Voltex',         'spoilers', 'supra_mk4,rx7_fd3s,nsx_na1,silvia_s15,evo_ix,wrx_sti_gd',   2800.00, '/textures/parts/voltex_gt.png',     '{"x":0,"y":0.1,"z":0}',  'wing_rear', 'Swan neck mount GT wing. Full carbon. Adjustable AoA.'),
  ('Rocket Bunny Ducktail',           'Rocket Bunny',   'spoilers', 'supra_mk4,silvia_s15,rx7_fd3s',                               780.00, '/textures/parts/rb_ducktail.png',   '{"x":0,"y":0.05,"z":0}', 'wing_rear', 'Low-profile duck bill. Subtle OEM+ look.'),
  ('Cusco Trunk Lip Spoiler',         'Cusco',          'spoilers', 'evo_ix,wrx_sti_gd,s2000_ap1',                                 420.00, '/textures/parts/cusco_lip.png',     '{"x":0,"y":0.03,"z":0}', 'wing_rear', 'OEM-style trunk lip. FRP. Tasteful aero.'),
  ('TRD Aerostabilizing Fin Spoiler', 'TRD',            'spoilers', 'ae86_trueno,supra_mk4',                                       560.00, '/textures/parts/trd_fin.png',       '{"x":0,"y":0.04,"z":0}', 'wing_rear', 'Toyota TRD trunk fin. Factory race aesthetic.'),
  ('RE-Amemiya Racing Wing',          'RE-Amemiya',     'spoilers', 'rx7_fd3s',                                                   1900.00, '/textures/parts/reamemiya_wing.png','{"x":0,"y":0.12,"z":0}', 'wing_rear', 'FD-specific high-mount wing. Full CFRP.'),
  ('M3 CSL-Style Trunk Spoiler',      'BMW M Performance','spoilers','bmw_e46_m3',                                                  680.00, '/textures/parts/bmw_csl_wing.png',  '{"x":0,"y":0.04,"z":0}', 'wing_rear', 'E46 M3 CSL-replica trunk lid spoiler. Carbon weave.'),
  ('GTI Edition 30 Rear Spoiler',     'Volkswagen',     'spoilers', 'golf_gti_mk4',                                                 320.00, '/textures/parts/gti_spoiler.png',   '{"x":0,"y":0.03,"z":0}', 'wing_rear', 'OEM factory spoiler. Clean roof-line integration.'),
  ('Cervini C-Series Spoiler',        'Cervini',        'spoilers', 'mustang_gt_sn95',                                              480.00, '/textures/parts/cervini_spoiler.png','{"x":0,"y":0.05,"z":0}','wing_rear', 'Fastback-style rear spoiler. Classic Mustang look.'),
  ('SLP Ls6 Wing',                    'SLP',            'spoilers', 'camaro_ss_f4,pontiac_gto_2004',                                540.00, '/textures/parts/slp_wing.png',      '{"x":0,"y":0.08,"z":0}', 'wing_rear', 'Aggressive high-mount wing. Race-inspired.');

-- ============================================================
-- PARTS — Liveries / Paint Wraps
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('3M Carbon Fiber Vinyl Wrap',    '3M',             'paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno,bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204,mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004', 650.00,  '/textures/parts/carbon_wrap.png',   '{}', 'hood', 'Forged carbon texture. Self-healing polymer.'),
  ('Avery SW900 Matte Black Wrap',  'Avery Dennison', 'paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno,bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204,mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004', 550.00,  '/textures/parts/matte_black.png',   '{}', 'hood', 'Dead flat matte black. Velvet texture finish.'),
  ('Oracal 970 Chrome Silver Wrap', 'Oracal',         'paint', 'supra_mk4,nsx_na1,rx7_fd3s,silvia_s15,bmw_e46_m3,porsche_911_996',                                                1100.00, '/textures/parts/chrome_silver.png', '{}', 'hood', 'Mirrored chrome. Show-stopper finish.'),
  ('Inozetek Gloss Candy Blue',     'Inozetek',       'paint', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno,bmw_e46_m3,golf_gti_mk4,audi_tt_8n', 780.00,'/textures/parts/candy_blue.png',   '{}', 'hood', 'Deep gloss candy blue. Colour-shifting in light.'),
  ('KPMF Brushed Titanium Wrap',    'KPMF',           'paint', 'supra_mk4,nsx_na1,rx7_fd3s,evo_ix,bmw_e46_m3,mercedes_c63_w204',                                                    950.00, '/textures/parts/brushed_ti.png',    '{}', 'hood', 'Metallic brushed titanium. Clean industrial look.');

-- ============================================================
-- PARTS — Lights & Tint
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('Kouki Euro Headlights',        'OEM (Kouki)', 'lights', 'silvia_s15',                                                                                                                                                                       1200.00, '/textures/parts/kouki_headlights.png', '{}', 'bumper_front', 'S15 Kouki face conversion. Clean projector housings.'),
  ('Depo Euro Altezza Tails',      'Depo',        'lights', 'ae86_trueno,silvia_s15',                                                                                                                                                            380.00, '/textures/parts/altezza_tails.png',    '{}', 'bumper_rear',  'Clear/smoke Altezza style. Euro look.'),
  ('HID Japan Projector Retrofit', 'HID Japan',   'lights', 'supra_mk4,rx7_fd3s,nsx_na1',                                                                                                                                                       450.00, '/textures/parts/hid_projector.png',    '{}', 'bumper_front', 'Bi-xenon projector retrofit kit. 5000K sharp cutoff.'),
  ('Llumar 35% Window Tint',       'Llumar',      'lights', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno,bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204,mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004', 250.00, '/textures/parts/tint_35.png', '{}', 'hood', '35% VLT ceramic film. UV block. No purple fade.'),
  ('Llumar 20% Window Tint',       'Llumar',      'lights', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno,bmw_e46_m3,audi_tt_8n,golf_gti_mk4,porsche_911_996,mercedes_c63_w204,mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004', 280.00, '/textures/parts/tint_20.png', '{}', 'hood', '20% VLT. Dark limo tint. Premium ceramic.');

-- ============================================================
-- PARTS — Engine Bay
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description)
VALUES
  ('HKS Racing Suction Cold Air Intake',     'HKS',       'engine_bay', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd',       380.00, '/textures/parts/hks_intake.png',    '{}', 'hood',        '+15hp sound and look. Short ram pod filter.'),
  ('GReddy Type-12C Front Mount Intercooler','GReddy',     'engine_bay', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd',      1100.00, '/textures/parts/greddy_fmic.png',   '{}', 'bumper_front','Full front-mount bar-and-plate FMIC. Core: 600x300x76mm.'),
  ('TRA Kyoto Carbon Engine Cover',          'TRA Kyoto', 'engine_bay', 'supra_mk4,rx7_fd3s,nsx_na1',                    650.00, '/textures/parts/carbon_cover.png',  '{}', 'hood',        'Dry-carbon valve/engine cover. Weight-conscious aesthetics.'),
  ('Cusco Strut Tower Brace',                'Cusco',     'engine_bay', 'evo_ix,wrx_sti_gd,s2000_ap1,ae86_trueno',       320.00, '/textures/parts/cusco_strut.png',   '{}', 'hood',        'Aluminium front strut bar. Stiffens firewall under load.'),
  ('Nismo Titanium Cam Cover',               'Nismo',     'engine_bay', 'silvia_s15',                                    580.00, '/textures/parts/nismo_camcover.png','{}', 'hood',        'SR20DET titanium-finish cam cover. Nismo blue bolts.');

-- ============================================================
-- PARTS — Performance (with hp_modifier / tq_modifier)
-- ============================================================
INSERT INTO parts (name, brand, category, compatible_cars, price_msrp, thumbnail_url, model_offset, attachment_node, description, hp_modifier, tq_modifier)
VALUES
  -- JDM Performance
  ('HKS GT2835 Pro Turbo Kit',          'HKS',         'performance', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd',             4800.00, '/textures/parts/hks_gt2835.png',     '{}', 'hood', 'Drop-in GT2835 upgrade. Spools fast, pulls hard. No intercooler piping changes.', 120.0, 140.0),
  ('Trust / GReddy T78-33D Turbo',      'Trust GReddy','performance', 'supra_mk4,rx7_fd3s',                                 7200.00, '/textures/parts/greddy_t78.png',      '{}', 'hood', 'Full T78 setup for high-power builds. 600+hp capable with supporting mods.',     200.0, 180.0),
  ('APEXi Power FC ECU Tune',           'APEXi',       'performance', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd,nsx_na1,s2000_ap1,ae86_trueno', 850.00, '/textures/parts/apexi_powerfc.png', '{}', 'hood', 'Full-authority standalone ECU. Unlocks fuelling, ignition, and boost maps.', 30.0, 25.0),
  ('Tomei Poncam Stage 2 Cams',         'Tomei',       'performance', 'supra_mk4,silvia_s15,s2000_ap1,ae86_trueno',         1600.00, '/textures/parts/tomei_poncam.png',    '{}', 'hood', '264-degree cams. Idle lope, mid-high lift gains. Pairs with ECU tune.',          45.0, 35.0),
  ('HKS GT Intercooler Full Kit',       'HKS',         'performance', 'supra_mk4,silvia_s15,evo_ix,wrx_sti_gd',             2200.00, '/textures/parts/hks_gt_fmic.png',     '{}', 'bumper_front', 'Bar-and-plate FMIC. Reduces charge temps. Enables more boost.',    40.0, 50.0),
  ('Walbro 460 High-Flow Fuel Pump',    'Walbro',      'performance', 'supra_mk4,silvia_s15,rx7_fd3s,evo_ix,wrx_sti_gd',    320.00, '/textures/parts/walbro_460.png',      '{}', 'hood', 'E85-compatible 460lph drop-in. Supports 600+whp fuel demands.',                 15.0, 10.0),
  ('Injector Dynamics ID1050X',         'Injector Dynamics','performance','supra_mk4,silvia_s15,evo_ix,wrx_sti_gd',          960.00, '/textures/parts/id1050x.png',         '{}', 'hood', '1050cc/min injectors. Linear at all duty cycles. E85 ready.',                    20.0, 18.0),
  ('RE-Amemiya AD Intake Manifold',     'RE-Amemiya',  'performance', 'rx7_fd3s',                                           1400.00, '/textures/parts/re_intake.png',       '{}', 'hood', 'Ported and polished 13B-REW manifold. Improves top-end pull.',                   35.0, 20.0),
  ('Cusco LSD Type-RS',                 'Cusco',       'performance', 'supra_mk4,silvia_s15,ae86_trueno,rx7_fd3s,s2000_ap1', 1800.00, '/textures/parts/cusco_lsd.png',      '{}', 'hood', '1.5-way helical LSD. Grip and rotation on demand. Bolt-in.',                      0.0, 15.0),
  -- Euro Performance
  ('Dinan Stage 2 Power Kit',           'Dinan',       'performance', 'bmw_e46_m3',                                          3200.00, '/textures/parts/dinan_stage2.png',    '{}', 'hood', 'Intake, software, underdrive pulleys. S54-specific. +50hp.',                    50.0, 40.0),
  ('APR Stage 2+ ECU',                  'APR',         'performance', 'golf_gti_mk4,audi_tt_8n',                             1100.00, '/textures/parts/apr_ecu.png',         '{}', 'hood', '1.8T big turbo map. Requires FMIC. 280+whp on pump gas.',                        80.0, 95.0),
  ('Gemballa Turbo Upgrade 996',        'Gemballa',    'performance', 'porsche_911_996',                                     8500.00, '/textures/parts/gemballa_turbo.png',  '{}', 'hood', 'GT3 RS-inspired internal upgrades. 420hp naturally-aspirated.',                 120.0, 90.0),
  ('Kleemann M156 Supercharger',        'Kleemann',    'performance', 'mercedes_c63_w204',                                   6800.00, '/textures/parts/kleemann_sc.png',     '{}', 'hood', 'Roots-type supercharger for the M156. Instant throttle response boost.',         130.0, 150.0),
  -- Muscle Performance
  ('Edelbrock E-Force Stage 2 Supercharger','Edelbrock','performance','mustang_gt_sn95,camaro_ss_f4,pontiac_gto_2004',        5400.00, '/textures/parts/edelbrock_eforce.png','{}', 'hood', 'Roots-type positive-displacement. 500+hp at 8psi.',                            180.0, 200.0),
  ('Lingenfelter LS3 Cam Kit',          'Lingenfelter','performance', 'camaro_ss_f4,pontiac_gto_2004',                       1800.00, '/textures/parts/linge_cam.png',       '{}', 'hood', '228/236 cam grind. Idle lope + 60hp NA. Pairs with tune.',                        60.0, 55.0),
  ('Diablosport Trinity ECU Tune',      'Diablosport', 'performance', 'mustang_gt_sn95,camaro_ss_f4,challenger_srt,pontiac_gto_2004,f150_raptor', 499.00, '/textures/parts/diablo_trinity.png', '{}', 'hood', 'Handheld tuner with pre-loaded maps. Airfuel/timing/shift points.',  35.0, 45.0),
  ('Whipple 3.0L Supercharger',         'Whipple',     'performance', 'challenger_srt',                                      7200.00, '/textures/parts/whipple_30.png',      '{}', 'hood', '3.0L twin-screw on the 392. 700+hp reliable street build.',                     220.0, 260.0),
  ('Shelby Performance Exhaust Headers','Shelby',      'performance', 'mustang_gt_sn95',                                     1200.00, '/textures/parts/shelby_headers.png',  '{}', 'hood', 'Long-tube headers. Unlocks 30hp on the 4.6 2V. Exhaust note transformed.',       30.0, 35.0),
  ('Banks Monster Intercooler Kit',     'Banks Power', 'performance', 'f150_raptor',                                         2400.00, '/textures/parts/banks_ic.png',        '{}', 'bumper_front', 'Drop-in charge cooler for EcoBoost. Supports 600whp tow tune.',       70.0, 110.0);
