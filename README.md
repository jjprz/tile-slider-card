# Tile Slider Card

A custom Home Assistant card that keeps the look and feel of the official `Tile` card, while adding a compact slider inside the same card footprint.

> **Experimental project**
>
> This card is currently experimental and still in testing. Options, behavior, and configuration details may change while the project evolves.

## Why This Exists

The goal of this card is to preserve the visual style of Home Assistant's official `Tile` card while allowing you to control a value with a slider without using extra dashboard space.

With the default Home Assistant setup, you often need one area for the entity itself and another row or feature for the slider. In dense dashboards, that usually means two visual spaces: one to see the entity and another one to control it.

`Tile Slider Card` solves that by combining the name, state, icon, actions, and slider into one compact card.

## Features

- Visual style inspired by Home Assistant's `Tile` card.
- Slider integrated directly into the card.
- Visual editor support.
- Official Home Assistant actions support.
- Configurable state content using Home Assistant's official `state_content` selector.
- Slider value source selector: `State` or `Attribute`.
- Dynamic list of numeric attributes from the selected entity.
- Placeholder showing the default slider attribute.
- Editor translations based on the user's language.
- Horizontal or vertical content layout.
- Option to always hide the state.
- Option to hide the state only when the entity is off.
- Option to remove the slider color when the entity is off.
- Icon background is removed when the icon has no dedicated action.
- Numeric sensors are shown as read-only progress bars.

## Manual Installation

1. Copy the compiled file:

```text
dist/tile-slider-card.js
```

to your Home Assistant `www` folder:

```text
/config/www/tile-slider-card.js
```

2. Add the resource in Home Assistant:

```yaml
url: /local/tile-slider-card.js?v=0.3.26
type: module
```

You can do this from:

```text
Settings > Dashboards > Resources
```

3. Reload your browser. If you do not see the latest version, clear the browser cache or change the `?v=` parameter.

## Basic Usage

```yaml
type: custom:tile-slider-card
entity: light.living_room
```

The card will automatically try to choose the best slider value for the selected entity domain.

## Supported Entities

The card can display any entity as a compact tile. The slider appears when the entity has a compatible numeric value.

| Domain | Default Slider Value | Control |
| --- | --- | --- |
| `light` | `brightness` attribute | `light.turn_on` with `brightness` |
| `cover` | `current_position` attribute | `cover.set_cover_position` |
| `fan` | `percentage` attribute | `fan.set_percentage` |
| `climate` | `temperature` attribute | `climate.set_temperature` |
| `water_heater` | `temperature` attribute | `water_heater.set_temperature` |
| `input_number` | entity state | `input_number.set_value` |
| `number` | entity state | `number.set_value` |
| numeric `sensor` | entity state | read-only |

Sensors are shown as progress bars only. They cannot be controlled from the slider.

## Slider Defaults

For most entities:

```yaml
min: 0
max: 100
step: 1
```

For lights:

```yaml
min: 0
max: 255
step: 1
```

For `climate` and `water_heater`:

```yaml
min: min_temp attribute
max: temperature attribute
step: target_temp_step attribute
```

If any of those attributes are missing, the card uses reasonable fallback values.

## Slider Value

In the visual editor, you can choose:

- `State`: use the numeric state of the entity.
- `Attribute`: use a numeric attribute from the entity.

When `Attribute` is selected, the dropdown shows numeric attributes detected from the entity. If you do not choose one, the card uses the default attribute for the entity domain and shows it as a placeholder.

Example:

```yaml
type: custom:tile-slider-card
entity: light.living_room
slider:
  attribute: brightness
```

Example using the entity state:

```yaml
type: custom:tile-slider-card
entity: input_number.volume
slider:
  value_source: state
```

## Slider Configuration

```yaml
type: custom:tile-slider-card
entity: light.living_room
slider:
  value_source: attribute
  attribute: brightness
  min: 0
  max: 255
  step: 1
  controllable: true
```

| Option | Type | Description |
| --- | --- | --- |
| `slider.value_source` | `state` / `attribute` | Chooses whether the slider uses the entity state or an attribute. |
| `slider.attribute` | string | Numeric attribute controlled by the slider. |
| `slider.min` | number | Minimum value. |
| `slider.max` | number | Maximum value. |
| `slider.step` | number | Slider increment. |
| `slider.controllable` | boolean | If `false`, the slider is displayed but cannot change the value. |

## State Content

The `state_content` field uses Home Assistant's official selector. You can show the state, attributes, or other supported content.

```yaml
type: custom:tile-slider-card
entity: climate.living_room
state_content:
  - state
  - current_temperature
  - temperature
```

If the state is hidden, the card removes `state` from the visible content when needed.

## Content Layout

You can choose the layout from the visual editor or YAML:

```yaml
type: custom:tile-slider-card
entity: light.living_room
vertical: true
```

The default layout is horizontal.

## Visual Options

```yaml
type: custom:tile-slider-card
entity: light.living_room
name: Living room light
icon: mdi:lamp
color: amber
show_entity_picture: false
hide_state: false
hide_state_when_off: true
hide_slider_when_off: true
```

| Option | Description |
| --- | --- |
| `name` | Name shown in the card. Compatible with the official entity name selector. |
| `icon` | Custom icon. |
| `color` | Active color. It can also use state-based color. |
| `show_entity_picture` | Shows the entity picture when available. |
| `hide_state` | Always hides the state. |
| `hide_state_when_off` | Hides the state only when the entity is `off`. |
| `hide_slider_when_off` | Removes the slider color when the entity is `off`. |

## Actions

The card uses official Home Assistant actions.

Defaults:

- Tapping the card opens `more-info`.
- Tapping the icon performs `toggle`.

Example:

```yaml
type: custom:tile-slider-card
entity: light.living_room
tap_action:
  action: more-info
icon_tap_action:
  action: toggle
```

You can also configure hold and double-tap actions:

```yaml
type: custom:tile-slider-card
entity: cover.living_room_blind
tap_action:
  action: more-info
icon_tap_action:
  action: toggle
icon_hold_action:
  action: more-info
double_tap_action:
  action: none
```

Available actions:

- `tap_action`
- `hold_action`
- `double_tap_action`
- `icon_tap_action`
- `icon_hold_action`
- `icon_double_tap_action`

If the icon has no dedicated action, the card removes the icon background so it does not look like a separate button.

## Examples

### Light

```yaml
type: custom:tile-slider-card
entity: light.living_room
state_content:
  - state
  - brightness
icon_tap_action:
  action: toggle
```

### Cover

```yaml
type: custom:tile-slider-card
entity: cover.living_room_blind
state_content:
  - state
  - current_position
icon_tap_action:
  action: toggle
```

### Climate

```yaml
type: custom:tile-slider-card
entity: climate.living_room
state_content:
  - state
  - current_temperature
  - temperature
slider:
  attribute: temperature
```

### Read-Only Climate

```yaml
type: custom:tile-slider-card
entity: climate.living_room
slider:
  controllable: false
state_content:
  - current_temperature
  - temperature
```

### Water Heater

```yaml
type: custom:tile-slider-card
entity: water_heater.boiler
state_content:
  - state
  - temperature
slider:
  attribute: temperature
```

### Fan

```yaml
type: custom:tile-slider-card
entity: fan.living_room_fan
state_content:
  - state
  - percentage
slider:
  attribute: percentage
```

### Input Number

```yaml
type: custom:tile-slider-card
entity: input_number.volume
slider:
  value_source: state
  min: 0
  max: 100
  step: 5
```

### Energy Sensor

```yaml
type: custom:tile-slider-card
entity: sensor.current_power
slider:
  value_source: state
  min: 0
  max: 5000
state_content:
  - state
```

Numeric sensors are shown as read-only progress bars. For power usage, setting `max` manually usually gives a better result.

### Hide State and Slider Color When Off

```yaml
type: custom:tile-slider-card
entity: light.living_room
hide_state_when_off: true
hide_slider_when_off: true
```

## Full Configuration

```yaml
type: custom:tile-slider-card
entity: light.living_room
name: Living room light
icon: mdi:lamp
color: amber
show_entity_picture: false
hide_state: false
hide_state_when_off: false
hide_slider_when_off: false
vertical: false
state_content:
  - state
  - brightness
slider:
  value_source: attribute
  attribute: brightness
  min: 0
  max: 255
  step: 1
  controllable: true
tap_action:
  action: more-info
icon_tap_action:
  action: toggle
hold_action:
  action: none
double_tap_action:
  action: none
icon_hold_action:
  action: none
icon_double_tap_action:
  action: none
```

You do not need to define every option. Most of them have defaults.

## Development

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

The final file is generated at:

```text
dist/tile-slider-card.js
```

Type-check:

```bash
node ./node_modules/typescript/bin/tsc --noEmit
```

## Notes

- Custom service support exists internally, but it is currently hidden from the visual editor.
- If Home Assistant does not show the latest change, reload the resource or change the JavaScript file version parameter.
- Sensors are read-only even when displayed as a slider-like progress bar.
