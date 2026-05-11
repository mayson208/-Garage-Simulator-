# APEX GARAGE — GLB Model Pipeline

## Directory Layout

```
frontend/public/
├── models/
│   ├── supra_mk4.glb
│   ├── rx7_fd3s.glb
│   ├── silvia_s15.glb
│   ├── evo_ix.glb
│   ├── wrx_sti_gd.glb
│   ├── nsx_na1.glb
│   ├── s2000_ap1.glb
│   ├── ae86_trueno.glb
│   ├── bmw_e46_m3.glb
│   ├── audi_tt_8n.glb
│   ├── golf_gti_mk4.glb
│   ├── porsche_911_996.glb
│   ├── mercedes_c63_w204.glb
│   ├── mustang_gt_sn95.glb
│   ├── camaro_ss_f4.glb
│   ├── challenger_srt.glb
│   ├── f150_raptor.glb
│   └── pontiac_gto_2004.glb
└── textures/
    ├── thumbnails/   ← PNG screenshots, 400×225
    └── parts/        ← Part card thumbnails, 200×200
```

## Poly Budget

| LOD      | Triangle target | When used              |
|----------|----------------|------------------------|
| Car body | < 40,000 tris  | All screen sizes       |
| Part swap| < 5,000 tris   | Attached to node       |
| Wheel    | < 2,000 tris   | ×4 per car             |

Total scene budget: **< 60,000 tris** at any given time.

## GLB Export Checklist

1. **Scale** — 1 Blender unit = 1 metre. Car bodies should be ~4.4 m long.
2. **Origin** — Set origin to world centre (0,0,0) at ground plane (Y=0 in Three.js).
3. **Axis** — Export with Y-up, Z-forward (Three.js coordinate system). In Blender: Apply rotation before export.
4. **Materials** — Use PBR (Principled BSDF → glTF). Bake ambient occlusion into base color or use AO map.
5. **Textures** — Max 2048×2048 JPEG/PNG, embedded or in `/textures/`. Power-of-two dimensions only.
6. **Normals** — Auto-smooth 45°. Export with tangents.
7. **Armature** — No armatures. Static mesh only (doors, hoods, etc. are separate scenes if interactive).
8. **Draco** — Compress with `gltf-pipeline -i model.glb -o model.min.glb --draco.compressionLevel 7`.

## Attachment Node Naming Convention

Nodes must be named **exactly** as listed in the `attachment_nodes` column of the `cars` table.
The 3D system (`CarModel.tsx`) reads the car's `attachmentNodes` string, splits on commas, and
positions part meshes at those node transforms.

| Node name       | Position on car         | Used for                    |
|-----------------|-------------------------|-----------------------------|
| `wheel_fl`      | Front-left wheel centre | All four wheels (mirrored)  |
| `wheel_fr`      | Front-right wheel centre| (auto-mirrored from fl)     |
| `wheel_rl`      | Rear-left wheel centre  | (auto-mirrored)             |
| `wheel_rr`      | Rear-right wheel centre | (auto-mirrored)             |
| `bumper_front`  | Front bumper midpoint   | Front bumpers, splitters    |
| `bumper_rear`   | Rear bumper midpoint    | Rear bumpers, diffusers     |
| `side_skirt_l`  | Left rocker panel       | Side skirts (mirrored to R) |
| `side_skirt_r`  | Right rocker panel      | (auto-mirrored)             |
| `wing_rear`     | Trunk/decklid           | Spoilers, wings             |
| `exhaust_tip`   | Rear exhaust exit(s)    | Exhaust tips                |
| `hood`          | Hood surface centre     | Scoops, vents, wraps        |

## Part GLB Guidelines

- **Bumpers** — Origin at car centre, same scale as body. Model offset JSON adjusts fine position.
- **Wheels** — Single wheel mesh, origin at wheel centre. `model_offset` rotates/translates per brand.
- **Wings** — Origin at mounting point (trunk edge). Y-offset in `model_offset` lifts blade above deck.

## Procedural Fallback

Until real GLBs exist, `CarModel.tsx` renders stylised procedural geometry (box body, sphere wheels,
cylinder exhaust). The system transparently falls back to procedural when `glbPath` is null or the
GLB fails to load. To activate a real model, just drop the `.glb` in `public/models/` — no code changes needed.

## Thumbnail Generation

1. Load the car in APEX Garage at default camera angle.
2. Press **Save** in My Garage — the canvas screenshot is captured automatically via `toDataURL`.
3. For static thumbnails, render in Blender at 400×225, save as JPEG q80, place in `public/textures/thumbnails/<model_key>.png`.
