import * as Slider from '@radix-ui/react-slider';

interface FilterRangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  unit?: string;
  onValueChange: (value: [number, number]) => void;
}

export function FilterRangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  unit = '',
  onValueChange,
}: FilterRangeSliderProps) {
  return (
    <div className="filter__group">
      <div className="filter__label-row">
        <span className="filter__label">{label}</span>
        <span className="filter__value">
          {value[0]}{unit} — {value[1]}{unit}
        </span>
      </div>
      <Slider.Root
        className="filter__slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onValueChange([next[0], next[1]])}
        minStepsBetweenThumbs={1}
        aria-label={label}
      >
        <Slider.Track className="filter__slider-track">
          <Slider.Range className="filter__slider-range" />
        </Slider.Track>
        <Slider.Thumb className="filter__slider-thumb" />
        <Slider.Thumb className="filter__slider-thumb" />
      </Slider.Root>
    </div>
  );
}
