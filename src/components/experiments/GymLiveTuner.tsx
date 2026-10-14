import React, { useState } from 'react'
import { ClothParams } from './GymClothCanvas'
import { Sliders, RefreshCw, ChevronUp, ChevronDown, Check } from 'lucide-react'

export interface PresetDef {
  name: string
  code: string
  desc: string
  params: ClothParams
}

export const PRESETS: PresetDef[] = [
  {
    name: 'RAW HEAVY 280G',
    code: 'PRESET-01',
    desc: 'Ondas densas y lentas, tela pesada con caída rígida y sombra profunda.',
    params: {
      waveIntensity: 0.75,
      waveSpeed: 1.1,
      mouseStrength: 0.36,
      radiusX: 0.48,
      radiusY: 1.35,
      baseRotX: -0.35,
      backDarkness: 0.48,
    },
  },
  {
    name: 'SUDOR & TENSIÓN',
    code: 'PRESET-02',
    desc: 'Micro-ondulación rápida con cursor elíptico más reactivo y tenso.',
    params: {
      waveIntensity: 1.15,
      waveSpeed: 2.2,
      mouseStrength: 0.52,
      radiusX: 0.42,
      radiusY: 1.55,
      baseRotX: -0.38,
      backDarkness: 0.55,
    },
  },
  {
    name: 'DISTORSIÓN ÁCIDA',
    code: 'PRESET-03',
    desc: 'Ondas cruzadas agresivas con mayor inclinación y choque visual.',
    params: {
      waveIntensity: 1.45,
      waveSpeed: 2.6,
      mouseStrength: 0.65,
      radiusX: 0.58,
      radiusY: 1.25,
      baseRotX: -0.45,
      backDarkness: 0.62,
    },
  },
  {
    name: 'SEDA FLUIDA',
    code: 'PRESET-04',
    desc: 'Tejido liviano con pliegues suaves y deformación elástica sutil.',
    params: {
      waveIntensity: 0.45,
      waveSpeed: 0.85,
      mouseStrength: 0.22,
      radiusX: 0.6,
      radiusY: 1.0,
      baseRotX: -0.22,
      backDarkness: 0.32,
    },
  },
]

interface GymLiveTunerProps {
  currentParams: ClothParams
  onChangeParams: (params: ClothParams) => void
  activePresetName: string
  onSelectPreset: (preset: PresetDef) => void
}

export const GymLiveTuner: React.FC<GymLiveTunerProps> = ({
  currentParams,
  onChangeParams,
  activePresetName,
  onSelectPreset,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside aria-label="Panel de Control de Físicas" className="fixed bottom-6 left-6 z-50 select-none">
      <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded shadow-[0_15px_40px_rgba(0,0,0,0.9)] max-w-sm sm:max-w-md overflow-hidden font-mono text-xs">
        {/* Header del Tuner */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-white" />
            <span className="font-bold text-white text-[11px] tracking-wider uppercase">
              LIVE TUNER // FÍSICAS DE TELA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
          <button className="text-zinc-400 hover:text-white">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {isOpen && (
          <div className="p-3.5 space-y-3">
            {/* Presets Rápidos */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                PRESETS DE COMPARACIÓN:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESETS.map((p) => {
                  const isActive = p.name === activePresetName
                  return (
                    <button
                      key={p.code}
                      onClick={() => onSelectPreset(p)}
                      className={`px-2 py-1.5 rounded text-[10px] text-left transition-all border ${
                        isActive
                          ? 'bg-white text-black font-bold border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                          : 'bg-black/50 text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{p.name}</span>
                        {isActive && <Check className="w-3 h-3 text-black stroke-[3]" />}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sliders Manuales en tiempo real */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                AJUSTES FINOS EN VIVO:
              </span>

              {/* Slider 1: Intensidad de Ondas */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Intensidad Ondas:</span>
                  <span className="text-white font-bold">{currentParams.waveIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.6"
                  step="0.05"
                  value={currentParams.waveIntensity}
                  onChange={(e) =>
                    onChangeParams({
                      ...currentParams,
                      waveIntensity: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-white h-1 bg-white/20 rounded cursor-pointer"
                />
              </div>

              {/* Slider 2: Fuerza del Cursor */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Fuerza Cursor:</span>
                  <span className="text-white font-bold">{currentParams.mouseStrength.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={currentParams.mouseStrength}
                  onChange={(e) =>
                    onChangeParams({
                      ...currentParams,
                      mouseStrength: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-white h-1 bg-white/20 rounded cursor-pointer"
                />
              </div>

              {/* Slider 3: Inclinación Inicial */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Inclinación Base (RotX):</span>
                  <span className="text-white font-bold">{currentParams.baseRotX.toFixed(2)} rad</span>
                </div>
                <input
                  type="range"
                  min="-0.6"
                  max="0.2"
                  step="0.02"
                  value={currentParams.baseRotX}
                  onChange={(e) =>
                    onChangeParams({
                      ...currentParams,
                      baseRotX: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-white h-1 bg-white/20 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Reset */}
            <div className="flex items-center justify-between pt-1 text-[9px] text-zinc-500">
              <span>EXPERIMENTACIÓN AISLADA</span>
              <button
                onClick={() => onSelectPreset(PRESETS[0])}
                className="flex items-center gap-1 text-zinc-400 hover:text-white"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Restablecer</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
