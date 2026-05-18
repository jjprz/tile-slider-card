# Tile Slider Card

Una tarjeta personalizada para Home Assistant que mantiene el aspecto de la tarjeta `Tile`, pero añade un slider compacto dentro del mismo espacio.

## Por qué existe

La idea de esta tarjeta es conservar el estilo visual de la `Tile` oficial de Home Assistant y, al mismo tiempo, poder controlar un valor con un slider sin ocupar más espacio del necesario.

Con la solución por defecto de Home Assistant, muchas veces necesitas una tarjeta para la entidad y otra fila o feature para el slider. En dashboards densos eso acaba ocupando dos espacios: uno para ver la entidad y otro para controlarla.

`Tile Slider Card` intenta resolver justo eso: nombre, estado, icono, acciones y slider en una única tarjeta compacta.

## Características

- Estilo inspirado en la tarjeta `Tile` de Home Assistant.
- Slider integrado en la propia tarjeta.
- Compatible con editor visual.
- Soporte para acciones oficiales de Home Assistant.
- Contenido de estado configurable con el selector oficial `state_content`.
- Selector de valor del slider: `Estado` o `Atributo`.
- Lista dinámica de atributos numéricos de la entidad.
- Placeholder con el atributo por defecto del slider.
- Traducciones del editor según el idioma del usuario.
- Modo horizontal o vertical para el contenido.
- Opción para ocultar el estado siempre.
- Opción para ocultar el estado solo si la entidad está apagada.
- Opción para quitar el color del slider si la entidad está apagada.
- Icono sin círculo visual cuando el icono no tiene acción propia.
- Sensores numéricos en modo solo lectura como barra de progreso.

## Instalación manual

1. Copia el archivo compilado:

```text
dist/tile-slider-card.js
```

en la carpeta `www` de Home Assistant:

```text
/config/www/tile-slider-card.js
```

2. Añade el recurso en Home Assistant:

```yaml
url: /local/tile-slider-card.js?v=0.3.26
type: module
```

Puedes hacerlo desde:

```text
Ajustes > Dashboards > Recursos
```

3. Recarga el navegador. Si no ves los cambios, limpia la caché o cambia el parámetro `?v=`.

## Uso básico

```yaml
type: custom:tile-slider-card
entity: light.salon
```

La tarjeta intentará elegir automáticamente el mejor valor para el slider según el dominio de la entidad.

## Entidades soportadas

La tarjeta puede mostrar cualquier entidad como una tarjeta compacta. El slider aparece cuando la entidad tiene un valor numérico compatible.

| Dominio | Valor por defecto del slider | Control |
| --- | --- | --- |
| `light` | atributo `brightness` | `light.turn_on` con `brightness` |
| `cover` | atributo `current_position` | `cover.set_cover_position` |
| `fan` | atributo `percentage` | `fan.set_percentage` |
| `climate` | atributo `temperature` | `climate.set_temperature` |
| `water_heater` | atributo `temperature` | `water_heater.set_temperature` |
| `input_number` | estado de la entidad | `input_number.set_value` |
| `number` | estado de la entidad | `number.set_value` |
| `sensor` numérico | estado de la entidad | solo lectura |

Los sensores solo muestran una barra de progreso. No se pueden controlar desde el slider.

## Valores por defecto del slider

Para la mayoría de entidades:

```yaml
min: 0
max: 100
step: 1
```

Para luces:

```yaml
min: 0
max: 255
step: 1
```

Para `climate` y `water_heater`:

```yaml
min: atributo min_temp
max: atributo temperature
step: atributo target_temp_step
```

Si falta algún atributo, la tarjeta usa valores de respaldo razonables.

## Valor del slider

En el editor visual puedes elegir:

- `Estado`: usa el estado numérico de la entidad.
- `Atributo`: usa un atributo numérico de la entidad.

Cuando se usa `Atributo`, el desplegable muestra atributos numéricos detectados dinámicamente. Si no eliges ninguno, se usa el atributo por defecto del dominio y aparece como placeholder.

Ejemplo:

```yaml
type: custom:tile-slider-card
entity: light.salon
slider:
  attribute: brightness
```

Ejemplo usando el estado:

```yaml
type: custom:tile-slider-card
entity: input_number.volumen
slider:
  value_source: state
```

## Configuración del slider

```yaml
type: custom:tile-slider-card
entity: light.salon
slider:
  value_source: attribute
  attribute: brightness
  min: 0
  max: 255
  step: 1
  controllable: true
```

| Opción | Tipo | Descripción |
| --- | --- | --- |
| `slider.value_source` | `state` / `attribute` | Decide si el slider usa el estado o un atributo. |
| `slider.attribute` | string | Atributo numérico que controla el slider. |
| `slider.min` | number | Valor mínimo. |
| `slider.max` | number | Valor máximo. |
| `slider.step` | number | Incremento del slider. |
| `slider.controllable` | boolean | Si es `false`, el slider se muestra pero no permite cambiar el valor. |

## Contenido del estado

El campo `state_content` usa el selector oficial de Home Assistant. Puedes mostrar el estado, atributos u otros contenidos compatibles.

```yaml
type: custom:tile-slider-card
entity: climate.salon
state_content:
  - state
  - current_temperature
  - temperature
```

Si ocultas el estado, la tarjeta elimina `state` del contenido visible cuando corresponde.

## Diseño del contenido

Puedes elegir el diseño desde el editor visual o con YAML:

```yaml
type: custom:tile-slider-card
entity: light.salon
vertical: true
```

Por defecto usa diseño horizontal.

## Opciones visuales

```yaml
type: custom:tile-slider-card
entity: light.salon
name: Luz salón
icon: mdi:lamp
color: amber
show_entity_picture: false
hide_state: false
hide_state_when_off: true
hide_slider_when_off: true
```

| Opción | Descripción |
| --- | --- |
| `name` | Nombre mostrado en la tarjeta. Compatible con el selector oficial de nombre de entidad. |
| `icon` | Icono personalizado. |
| `color` | Color activo. También puede usar el color por estado. |
| `show_entity_picture` | Muestra la imagen de la entidad si existe. |
| `hide_state` | Oculta el estado siempre. |
| `hide_state_when_off` | Oculta el estado solo cuando la entidad está `off`. |
| `hide_slider_when_off` | Quita el color del slider cuando la entidad está `off`. |

## Acciones

La tarjeta usa las acciones oficiales de Home Assistant.

Por defecto:

- Tocar la tarjeta abre `more-info`.
- Tocar el icono hace `toggle`.

Ejemplo:

```yaml
type: custom:tile-slider-card
entity: light.salon
tap_action:
  action: more-info
icon_tap_action:
  action: toggle
```

También puedes configurar acciones de mantener pulsado o doble toque:

```yaml
type: custom:tile-slider-card
entity: cover.persiana_salon
tap_action:
  action: more-info
icon_tap_action:
  action: toggle
icon_hold_action:
  action: more-info
double_tap_action:
  action: none
```

Acciones disponibles:

- `tap_action`
- `hold_action`
- `double_tap_action`
- `icon_tap_action`
- `icon_hold_action`
- `icon_double_tap_action`

Si el icono no tiene ninguna acción propia, la tarjeta elimina el círculo de fondo del icono para que no parezca un botón separado.

## Ejemplos

### Luz

```yaml
type: custom:tile-slider-card
entity: light.salon
state_content:
  - state
  - brightness
icon_tap_action:
  action: toggle
```

### Persiana o cover

```yaml
type: custom:tile-slider-card
entity: cover.persiana_salon
state_content:
  - state
  - current_position
icon_tap_action:
  action: toggle
```

### Clima

```yaml
type: custom:tile-slider-card
entity: climate.salon
state_content:
  - state
  - current_temperature
  - temperature
slider:
  attribute: temperature
```

### Clima solo lectura

```yaml
type: custom:tile-slider-card
entity: climate.salon
slider:
  controllable: false
state_content:
  - current_temperature
  - temperature
```

### Calentador de agua

```yaml
type: custom:tile-slider-card
entity: water_heater.termo
state_content:
  - state
  - temperature
slider:
  attribute: temperature
```

### Ventilador

```yaml
type: custom:tile-slider-card
entity: fan.ventilador
state_content:
  - state
  - percentage
slider:
  attribute: percentage
```

### Input number

```yaml
type: custom:tile-slider-card
entity: input_number.volumen
slider:
  value_source: state
  min: 0
  max: 100
  step: 5
```

### Sensor de consumo

```yaml
type: custom:tile-slider-card
entity: sensor.consumo_actual
slider:
  value_source: state
  min: 0
  max: 5000
state_content:
  - state
```

Los sensores numéricos se muestran como progreso de solo lectura. Para consumo eléctrico suele quedar mejor fijar `max` manualmente.

### Ocultar estado y color del slider cuando está apagado

```yaml
type: custom:tile-slider-card
entity: light.salon
hide_state_when_off: true
hide_slider_when_off: true
```

## Configuración completa

```yaml
type: custom:tile-slider-card
entity: light.salon
name: Luz salón
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

No necesitas definir todas las opciones. La mayoría tienen valores por defecto.

## Desarrollo

Instala dependencias:

```bash
npm install
```

Compila:

```bash
npm run build
```

El archivo final se genera en:

```text
dist/tile-slider-card.js
```

Comprobar TypeScript:

```bash
node ./node_modules/typescript/bin/tsc --noEmit
```

## Notas

- El servicio personalizado existe internamente, pero está oculto del editor visual por ahora.
- Si Home Assistant no muestra el último cambio, recarga el recurso o cambia el parámetro de versión del archivo JavaScript.
- Para sensores, el slider es solo lectura aunque aparezca como barra de progreso.
