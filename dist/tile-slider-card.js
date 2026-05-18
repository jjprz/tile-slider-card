// src/tile-slider-card.ts
var VERSION = "0.3.25";
console.info("%c TILE-SLIDER-CARD %c ".concat(VERSION, " "), "color: pink; background: purple; font-weight: 700;", "color: purple; background: pink; font-weight: 700;");
var OPTIONAL_ACTION_KEYS = [
  "hold_action",
  "icon_hold_action",
  "double_tap_action",
  "icon_double_tap_action"
];
var DEFAULT_STATE_ACTIVE_COLOR = "var(--state-active-color, var(--amber-color))";
var STATE_ACTIVE_COLOR_BY_DOMAIN = {
  binary_sensor: "amber",
  cover: "purple",
  device_tracker: "blue",
  fan: "cyan",
  lawn_mower: "teal",
  light: "amber",
  media_player: "light-blue",
  person: "blue",
  plant: "red",
  siren: "red",
  switch: "amber",
  update: "orange",
  vacuum: "teal",
  valve: "blue"
};
function stateActiveColor(entity) {
  const domain = entity?.entity_id.split(".")[0];
  const fallbackColor = domain ? STATE_ACTIVE_COLOR_BY_DOMAIN[domain] : void 0;
  if (!domain || !fallbackColor) return DEFAULT_STATE_ACTIVE_COLOR;
  return `var(--state-${domain}-active-color, var(--${fallbackColor}-color))`;
}
var EN_TRANSLATION = {
  labels: {
    entity: "Entity",
    name: "Name",
    icon: "Icon",
    color: "Color",
    show_entity_picture: "Show entity picture",
    hide_state: "Hide state",
    hide_state_when_off: "Hide state when off",
    hide_slider_when_off: "Hide slider when off",
    vertical: "Vertical layout",
    content_layout: "Content layout",
    show: "Show state",
    controllable: "Allow sliding",
    value_source: "Slider value",
    attribute: "Slider attribute",
    min: "Minimum",
    max: "Maximum",
    step: "Step",
    service: "Custom service",
    service_data: "Service data",
    state_content: "State content",
    tap_action: "Tap action",
    hold_action: "Hold action",
    double_tap_action: "Double tap action",
    icon_tap_action: "Icon tap action",
    icon_hold_action: "Icon hold action",
    icon_double_tap_action: "Icon double tap action"
  },
  helpers: {
    color: "Inactive states, for example off or closed, will not be colored.",
    hide_state_when_off: "Hides the main state only when the entity is off.",
    hide_slider_when_off: "Removes the slider color only when the entity is off.",
    controllable: "Allows changing the value by dragging. Sensors are always read-only.",
    attribute: "Optional. Real entity attribute controlled by the slider. Leave empty to choose one automatically by domain.",
    service: "Select a Home Assistant service, or type domain.service manually.",
    service_data: "Optional. You can use {{ value }} and {{ entity_id }}.",
    state_content: "Real entity attributes shown as state chips. Custom values are allowed.",
    tap_action: "Official Home Assistant action for tapping the tile.",
    hold_action: "Official Home Assistant action for holding the tile.",
    double_tap_action: "Official Home Assistant action for double tapping the tile.",
    icon_tap_action: "Official Home Assistant action for tapping the icon.",
    icon_hold_action: "Official Home Assistant action for holding the icon.",
    icon_double_tap_action: "Official Home Assistant action for double tapping the icon."
  },
  attributes: {
    brightness: "Brightness",
    color_temp_kelvin: "Color temperature Kelvin",
    current_position: "Current position",
    current_tilt_position: "Current tilt",
    position: "Position",
    percentage: "Percentage",
    preset_mode: "Preset mode",
    temperature: "Target temperature",
    current_temperature: "Current temperature",
    target_temp_low: "Target low temperature",
    target_temp_high: "Target high temperature",
    humidity: "Humidity",
    current_humidity: "Current humidity",
    battery_level: "Battery",
    effect: "Effect",
    color_temp: "Color temperature",
    rgb_color: "RGB color",
    hs_color: "HS color",
    device_class: "Device class",
    state_class: "State class",
    volume_level: "Volume",
    media_title: "Title",
    media_artist: "Artist",
    media_album_name: "Album",
    fan_speed: "Speed",
    status: "Internal status",
    mode: "Mode",
    min: "Minimum",
    max: "Maximum",
    min_temp: "Minimum temperature",
    max_temp: "Maximum temperature",
    target_temp_step: "Temperature step",
    unit_of_measurement: "Unit of measurement",
    friendly_name: "Friendly name"
  },
  sections: {
    content: "Content",
    interactions: "Interactions",
    features: "Features"
  },
  options: {
    state: "State",
    attribute: "Attribute",
    horizontal: "Horizontal",
    vertical: "Vertical"
  },
  errors: {
    error_title: "Configuration error",
    error_message: "Specify an entity"
  },
  aria: {
    icon_action: "Icon action",
    slider: "Slider"
  },
  messages: {
    entity_not_found: "Entity not found"
  }
};
var TRANSLATIONS = {
  en: EN_TRANSLATION,
  es: {
    labels: {
      entity: "Entidad",
      name: "Nombre",
      icon: "Icono",
      color: "Color",
      show_entity_picture: "Mostrar imagen de entidad",
      hide_state: "Ocultar estado",
      hide_state_when_off: "Ocultar estado si est\xE1 apagado",
      hide_slider_when_off: "Ocultar Slider si est\xE1 apagado",
      vertical: "Dise\xF1o vertical",
      content_layout: "Dise\xF1o del contenido",
      show: "Mostrar estado",
      controllable: "Permitir deslizar",
      value_source: "Valor del Slider",
      attribute: "Atributo del slider",
      min: "M\xEDnimo",
      max: "M\xE1ximo",
      step: "Paso",
      service: "Servicio personalizado",
      service_data: "Datos del servicio",
      state_content: "Contenido del estado",
      tap_action: "Acci\xF3n al tocar",
      hold_action: "Acci\xF3n al mantener",
      double_tap_action: "Acci\xF3n de doble toque",
      icon_tap_action: "Acci\xF3n al tocar el icono",
      icon_hold_action: "Acci\xF3n al mantener el icono",
      icon_double_tap_action: "Acci\xF3n de doble toque en el icono"
    },
    helpers: {
      color: "El estado inactivo (por ejemplo, apagado, cerrado) no se colorear\xE1.",
      hide_state_when_off: "Oculta el estado principal solo cuando la entidad est\xE1 apagada.",
      hide_slider_when_off: "Quita el color del slider solo cuando la entidad est\xE1 apagada.",
      controllable: "Permite cambiar el valor arrastrando. Los sensores siempre quedan en solo lectura.",
      attribute: "Opcional. Atributo real de la entidad que controla el slider. Si lo dejas vac\xEDo se elige autom\xE1ticamente seg\xFAn el dominio.",
      service: "Selecciona un servicio de Home Assistant, o escribe dominio.servicio manualmente.",
      service_data: "Opcional. Puedes usar {{ value }} y {{ entity_id }}.",
      tap_action: "Acci\xF3n oficial de Home Assistant al tocar el tile.",
      hold_action: "Acci\xF3n oficial de Home Assistant al mantener pulsado el tile.",
      double_tap_action: "Acci\xF3n oficial de Home Assistant al hacer doble toque en el tile.",
      icon_tap_action: "Acci\xF3n oficial de Home Assistant al tocar el icono.",
      icon_hold_action: "Acci\xF3n oficial de Home Assistant al mantener pulsado el icono.",
      icon_double_tap_action: "Acci\xF3n oficial de Home Assistant al hacer doble toque en el icono."
    },
    attributes: {
      brightness: "Brillo",
      color_temp_kelvin: "Temperatura de color Kelvin",
      current_position: "Posici\xF3n actual",
      current_tilt_position: "Inclinaci\xF3n actual",
      position: "Posici\xF3n",
      percentage: "Porcentaje",
      preset_mode: "Modo predefinido",
      temperature: "Temperatura objetivo",
      current_temperature: "Temperatura actual",
      target_temp_low: "Temperatura m\xEDnima objetivo",
      target_temp_high: "Temperatura m\xE1xima objetivo",
      humidity: "Humedad",
      current_humidity: "Humedad actual",
      battery_level: "Bater\xEDa",
      effect: "Efecto",
      color_temp: "Temperatura de color",
      rgb_color: "Color RGB",
      hs_color: "Color HS",
      device_class: "Clase de dispositivo",
      state_class: "Clase de estado",
      volume_level: "Volumen",
      media_title: "T\xEDtulo",
      media_artist: "Artista",
      media_album_name: "\xC1lbum",
      fan_speed: "Velocidad",
      status: "Estado interno",
      mode: "Modo",
      min: "M\xEDnimo",
      max: "M\xE1ximo",
      min_temp: "Temperatura m\xEDnima",
      max_temp: "Temperatura m\xE1xima",
      target_temp_step: "Paso de temperatura",
      unit_of_measurement: "Unidad de medida",
      friendly_name: "Nombre amigable"
    },
    sections: {
      content: "Contenido",
      interactions: "Interacciones",
      features: "Funcionalidades"
    },
    options: {
      state: "Estado",
      attribute: "Atributo",
      horizontal: "Horizontal",
      vertical: "Vertical"
    },
    errors: {
      error_title: "Error de configuraci\xF3n",
      error_message: "Especifica una entidad"
    },
    aria: {
      icon_action: "Acci\xF3n del icono",
      slider: "Slider"
    },
    messages: {
      entity_not_found: "Entidad no encontrada"
    }
  },
  fr: {
    sections: { content: "Contenu", interactions: "Interactions", features: "Fonctionnalit\xE9s" },
    options: { state: "\xC9tat", horizontal: "Horizontal", vertical: "Vertical" },
    errors: { error_title: "Erreur de configuration", error_message: "Indiquez une entit\xE9" },
    messages: { entity_not_found: "Entit\xE9 introuvable" }
  },
  de: {
    sections: { content: "Inhalt", interactions: "Interaktionen", features: "Funktionen" },
    options: { state: "Status", horizontal: "Horizontal", vertical: "Vertikal" },
    errors: { error_title: "Konfigurationsfehler", error_message: "Geben Sie eine Entit\xE4t an" },
    messages: { entity_not_found: "Entit\xE4t nicht gefunden" }
  },
  it: {
    sections: { content: "Contenuto", interactions: "Interazioni", features: "Funzionalit\xE0" },
    options: { state: "Stato", horizontal: "Orizzontale", vertical: "Verticale" },
    errors: { error_title: "Errore di configurazione", error_message: "Specifica una entit\xE0" },
    messages: { entity_not_found: "Entit\xE0 non trovata" }
  },
  pt: {
    sections: { content: "Conte\xFAdo", interactions: "Intera\xE7\xF5es", features: "Funcionalidades" },
    options: { state: "Estado", horizontal: "Horizontal", vertical: "Vertical" },
    errors: { error_title: "Erro de configura\xE7\xE3o", error_message: "Especifique uma entidade" },
    messages: { entity_not_found: "Entidade n\xE3o encontrada" }
  }
};
function normalizeLanguage(language) {
  return (language || "en").toLowerCase().split("-")[0];
}
function getPreferredLanguage(hass) {
  if (hass?.locale?.language) return normalizeLanguage(hass.locale.language);
  const browserLanguage = typeof navigator !== "undefined" ? navigator.language : "en";
  return normalizeLanguage(browserLanguage);
}
function translate(language, section, key) {
  const lang = normalizeLanguage(language);
  return TRANSLATIONS[lang]?.[section]?.[key] ?? EN_TRANSLATION[section][key] ?? key;
}
function translateOptional(language, section, key) {
  const lang = normalizeLanguage(language);
  return TRANSLATIONS[lang]?.[section]?.[key] ?? EN_TRANSLATION[section][key];
}
function computeLabel(schema, language) {
  return schema.name ? translate(language, "labels", schema.name) : void 0;
}
function computeHelper(schema, language) {
  return schema.name ? translateOptional(language, "helpers", schema.name) : void 0;
}
function attributeOptionsSignature(entity) {
  if (!entity) return "missing";
  const attrs = Object.keys(entity.attributes || {}).sort((a, b) => a.localeCompare(b));
  const numericAttrs = attrs.filter((attr) => isNumericAttributeValue(entity.attributes[attr]));
  return `${entity.entity_id}:${isNumericStateValue(entity.state)}:${attrs.join("|")}:${numericAttrs.join("|")}`;
}
function isNumericAttributeValue(value) {
  return typeof value === "number" && Number.isFinite(value);
}
function isNumericStateValue(value) {
  return value !== void 0 && value !== null && value !== "" && typeof value !== "boolean" && !Array.isArray(value) && Number.isFinite(Number(value));
}
function defaultSliderAttribute(entity) {
  if (!entity) return void 0;
  const domain = entity.entity_id.split(".")[0];
  if (domain === "light") return "brightness";
  if (domain === "cover") return "current_position";
  if (domain === "climate") return "temperature";
  if (domain === "water_heater") return "temperature";
  if (domain === "fan") return "percentage";
  if (domain === "input_number" || domain === "number") return "state";
  if (domain === "sensor" && isMeasurementSensor(entity)) return "state";
  return void 0;
}
function sliderValueSourceFromConfig(config, entity) {
  const slider = config?.slider;
  if (slider?.value_source) return slider.value_source;
  if (slider?.attribute === "state") return "state";
  if (!slider?.attribute && defaultSliderAttribute(entity) === "state") return "state";
  return "attribute";
}
function attributeLabel(entity, attr, hass, language) {
  if (attr === "state") return translate(language, "options", "state");
  return hass?.formatEntityAttributeName?.(entity, attr) || prettyAttributeLabel(attr, language);
}
function sliderAttributeOptionsFromEntity(entity, hass, language) {
  if (!entity) return [];
  const defaultAttribute = defaultSliderAttribute(entity);
  const options = [];
  const seen = /* @__PURE__ */ new Set();
  const addOption = (attr) => {
    if (seen.has(attr)) return;
    seen.add(attr);
    options.push({
      value: attr,
      label: attributeLabel(entity, attr, hass, language)
    });
  };
  if (defaultAttribute && defaultAttribute !== "state") {
    addOption(defaultAttribute);
  }
  const attrs = Object.keys(entity.attributes || {}).sort((a, b) => a.localeCompare(b));
  for (const attr of attrs) {
    if (attr !== defaultAttribute && !isNumericAttributeValue(entity.attributes[attr])) continue;
    addOption(attr);
  }
  return options;
}
function sliderAttributePlaceholder(entity, hass, language) {
  const defaultAttribute = defaultSliderAttribute(entity);
  return entity && defaultAttribute && defaultAttribute !== "state" ? attributeLabel(entity, defaultAttribute, hass, language) : void 0;
}
function isValidSliderAttribute(entity, attribute) {
  if (attribute === "state") return isNumericStateValue(entity.state);
  return isNumericAttributeValue(entity.attributes?.[attribute]);
}
function serviceOptionsFromHass(hass) {
  const services = hass?.services || {};
  return Object.entries(services).flatMap(
    ([domain, domainServices]) => Object.entries(domainServices || {}).map(([service, serviceInfo]) => {
      const value = `${domain}.${service}`;
      const name = serviceInfo?.name || serviceInfo?.description;
      return {
        value,
        label: name ? `${value} (${name})` : value
      };
    })
  ).sort((a, b) => a.value.localeCompare(b.value));
}
function serviceOptionsSignature(hass) {
  return serviceOptionsFromHass(hass).map((option) => option.value).join("|");
}
function prettyAttributeLabel(attr, language) {
  const translated = translate(language, "attributes", attr);
  if (translated !== attr) return translated;
  return attr.replace(/_/g, " ");
}
function isMeasurementSensor(entity) {
  if (entity.entity_id.split(".")[0] !== "sensor") return false;
  if (!Number.isFinite(Number(entity.state))) return false;
  const attrs = entity.attributes || {};
  const deviceClass = String(attrs.device_class || "");
  const stateClass = String(attrs.state_class || "");
  return Boolean(
    attrs.unit_of_measurement || stateClass === "measurement" || ["power", "energy", "current", "voltage", "temperature", "humidity", "monetary"].includes(deviceClass)
  );
}
function numberFromAttribute(entity, attr, fallback) {
  const value = Number(entity.attributes[attr]);
  return Number.isFinite(value) ? value : fallback;
}
function defaultTemperatureSliderValues(entity) {
  const maxFallback = numberFromAttribute(entity, "max_temp", 35);
  return {
    min: numberFromAttribute(entity, "min_temp", 5),
    max: numberFromAttribute(entity, "temperature", maxFallback),
    step: numberFromAttribute(entity, "target_temp_step", 0.5)
  };
}
function defaultSliderValues(entity) {
  if (!entity) {
    return { min: 0, max: 100, step: 1 };
  }
  const domain = entity.entity_id.split(".")[0];
  const attribute = defaultSliderAttribute(entity);
  if (domain === "climate" || domain === "water_heater") {
    return defaultTemperatureSliderValues(entity);
  }
  if (attribute === "brightness") return { min: 0, max: 255, step: 1 };
  return { min: 0, max: 100, step: 1 };
}
function editorSchema(entity, config, contentExpanded = false, sliderExpanded = false, language, hass) {
  const attributeOptions = sliderAttributeOptionsFromEntity(entity, hass, language);
  const valueSource = sliderValueSourceFromConfig(config, entity);
  const sliderDefaults = defaultSliderValues(entity);
  const stateVisibilitySchema = [
    { name: "show_entity_picture", default: false, selector: { boolean: {} } },
    { name: "hide_state", default: false, selector: { boolean: {} } },
    { name: "hide_state_when_off", default: false, selector: { boolean: {} } },
    { name: "hide_slider_when_off", default: false, selector: { boolean: {} } }
  ];
  return [
    { name: "entity", selector: { entity: {} } },
    {
      type: "expandable",
      name: "content",
      title: translate(language, "sections", "content"),
      icon: "mdi:text-short",
      flatten: true,
      expanded: contentExpanded,
      schema: [
        {
          name: "name",
          selector: { entity_name: {} },
          context: { entity: "entity" }
        },
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "200px",
          schema: [
            {
              name: "icon",
              selector: { icon: {} },
              context: { icon_entity: "entity" }
            },
            {
              name: "color",
              selector: {
                ui_color: {
                  default_color: "state",
                  include_state: true
                }
              }
            }
          ]
        },
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "200px",
          schema: stateVisibilitySchema
        },
        {
          name: "state_content",
          selector: {
            ui_state_content: {
              allow_context: true
            }
          },
          context: {
            filter_entity: "entity"
          }
        },
        {
          name: "content_layout",
          required: true,
          selector: {
            select: {
              mode: "box",
              options: [
                {
                  label: translate(language, "options", "horizontal"),
                  value: "horizontal",
                  image: {
                    src: "/static/images/form/tile_content_layout_horizontal.svg",
                    src_dark: "/static/images/form/tile_content_layout_horizontal_dark.svg",
                    flip_rtl: true
                  }
                },
                {
                  label: translate(language, "options", "vertical"),
                  value: "vertical",
                  image: {
                    src: "/static/images/form/tile_content_layout_vertical.svg",
                    src_dark: "/static/images/form/tile_content_layout_vertical_dark.svg",
                    flip_rtl: true
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      type: "expandable",
      name: "interactions",
      title: translate(language, "sections", "interactions"),
      icon: "mdi:gesture-tap",
      flatten: true,
      schema: [
        {
          name: "tap_action",
          selector: { ui_action: { default_action: "more-info" } },
          context: { entity_id: "entity" }
        },
        {
          name: "icon_tap_action",
          selector: { ui_action: { default_action: "toggle" } },
          context: { entity_id: "entity" }
        },
        {
          name: "",
          type: "optional_actions",
          flatten: true,
          schema: OPTIONAL_ACTION_KEYS.map((name) => ({
            name,
            selector: { ui_action: { default_action: "none" } },
            context: { entity_id: "entity" }
          }))
        }
      ]
    },
    {
      type: "expandable",
      name: "slider",
      title: translate(language, "sections", "features"),
      icon: "mdi:list-box",
      expanded: sliderExpanded,
      schema: [
        { name: "controllable", default: true, selector: { boolean: {} } },
        {
          name: "value_source",
          default: valueSource,
          selector: {
            button_toggle: {
              options: [
                { value: "state", label: translate(language, "options", "state") },
                { value: "attribute", label: translate(language, "options", "attribute") }
              ]
            }
          }
        },
        ...valueSource === "attribute" ? [
          {
            name: "attribute",
            selector: {
              select: {
                mode: "dropdown",
                custom_value: true,
                options: attributeOptions
              }
            }
          }
        ] : [],
        {
          type: "grid",
          name: "",
          flatten: true,
          column_min_width: "120px",
          schema: [
            { name: "min", default: sliderDefaults.min, selector: { number: { mode: "box" } } },
            { name: "max", default: sliderDefaults.max, selector: { number: { mode: "box" } } },
            { name: "step", default: sliderDefaults.step, selector: { number: { mode: "box", step: 0.1 } } }
          ]
        }
      ]
    }
  ];
}
var TileSliderCardEditor = class extends HTMLElement {
  constructor() {
    super();
    this._expandContentOnNextRender = false;
    this._expandSliderOnNextRender = false;
    this._root = this.attachShadow({ mode: "open" });
  }
  setConfig(config) {
    const nextConfig = {
      state: { show: true },
      slider: { controllable: true },
      features_position: "inline",
      ...config
    };
    const entityId = nextConfig.entity;
    const entity = entityId && this._hass ? this._hass.states[entityId] : void 0;
    const optionSignature = attributeOptionsSignature(entity);
    const language = getPreferredLanguage(this._hass);
    const serviceSignature = serviceOptionsSignature(this._hass);
    const form = this._root.querySelector("ha-form");
    const needsSchemaRender = entityId !== this._lastEntityId || optionSignature !== this._lastOptionSignature || language !== this._lastLanguage || serviceSignature !== this._lastServiceSignature;
    const isEchoFromForm = this.configSignature(config) === this._lastDispatchedConfigSignature;
    if (!isEchoFromForm) {
      this._sliderValueSourceOverride = void 0;
    }
    this._config = this.withoutEmptyOptionalActions(nextConfig);
    if (!form || needsSchemaRender) {
      this.render();
      return;
    }
    if (!isEchoFromForm) {
      form.data = this.editorData(this._config);
    }
  }
  set hass(hass) {
    this._hass = hass;
    const entityId = this._config?.entity;
    const entity = entityId ? hass.states[entityId] : void 0;
    const optionSignature = attributeOptionsSignature(entity);
    const language = getPreferredLanguage(hass);
    const serviceSignature = serviceOptionsSignature(hass);
    if (entityId !== this._lastEntityId || optionSignature !== this._lastOptionSignature || language !== this._lastLanguage || serviceSignature !== this._lastServiceSignature) {
      this._lastEntityId = entityId;
      this._lastOptionSignature = optionSignature;
      this._lastLanguage = language;
      this._lastServiceSignature = serviceSignature;
      this.render();
      return;
    }
    const form = this._root.querySelector("ha-form");
    if (form) {
      form.hass = hass;
    } else {
      this.render();
    }
  }
  configSignature(config) {
    try {
      return JSON.stringify(config);
    } catch (_err) {
      return "";
    }
  }
  editorSliderValueSource(config, entity) {
    const entityId = config?.entity || entity?.entity_id;
    if (this._sliderValueSourceOverride?.entityId === entityId) {
      return this._sliderValueSourceOverride.source;
    }
    return sliderValueSourceFromConfig(config, entity);
  }
  editorData(config) {
    const cleanedConfig = this.withoutEmptyOptionalActions(config);
    const entity = cleanedConfig.entity && this._hass ? this._hass.states[cleanedConfig.entity] : void 0;
    const defaultAttribute = defaultSliderAttribute(entity);
    const slider = cleanedConfig.slider ? { ...cleanedConfig.slider } : { value_source: "attribute" };
    slider.value_source = this.editorSliderValueSource(cleanedConfig, entity);
    if (slider?.attribute && slider.attribute === defaultAttribute) {
      delete slider.attribute;
    }
    return {
      ...cleanedConfig,
      ...slider ? { slider } : {},
      content_layout: config.vertical ? "vertical" : "horizontal"
    };
  }
  configFromEditorData(data) {
    const { content_layout: contentLayout, ...config } = data;
    const editorSlider = config.slider;
    const entity = config.entity && this._hass ? this._hass.states[config.entity] : void 0;
    const valueSource = editorSlider?.value_source ?? this.editorSliderValueSource(config, entity);
    if (editorSlider) {
      editorSlider.value_source = valueSource;
      if (valueSource === "state") {
        editorSlider.attribute = "state";
      } else if (editorSlider.attribute === "state") {
        delete editorSlider.attribute;
      }
    }
    const nextConfig = this.withoutEmptyOptionalActions({
      ...config,
      vertical: contentLayout ? contentLayout === "vertical" : config.vertical === true
    });
    if (!nextConfig.slider?.service) {
      delete nextConfig.slider?.service_data;
    }
    const configuredAttribute = nextConfig.slider?.attribute;
    if (entity && configuredAttribute === defaultSliderAttribute(entity)) {
      delete nextConfig.slider?.attribute;
    } else if (entity && configuredAttribute && configuredAttribute !== "state" && !isValidSliderAttribute(entity, configuredAttribute)) {
      delete nextConfig.slider?.attribute;
    }
    if (nextConfig.slider?.value_source) {
      const sliderWithoutExplicitSource = { ...nextConfig.slider };
      delete sliderWithoutExplicitSource.value_source;
      const implicitValueSource = sliderValueSourceFromConfig(
        { ...nextConfig, slider: sliderWithoutExplicitSource },
        entity
      );
      if (nextConfig.slider.value_source === implicitValueSource) {
        delete nextConfig.slider.value_source;
      }
    }
    return nextConfig;
  }
  withoutEmptyOptionalActions(config) {
    const cleanedConfig = { ...config };
    for (const key of OPTIONAL_ACTION_KEYS) {
      const action = cleanedConfig[key];
      if (!action || action.action === void 0 || action.action === "none") {
        delete cleanedConfig[key];
      }
    }
    return cleanedConfig;
  }
  dispatchConfigChanged(config) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config }
      })
    );
  }
  render() {
    if (!this._config) return;
    const entity = this._config.entity && this._hass ? this._hass.states[this._config.entity] : void 0;
    const language = getPreferredLanguage(this._hass);
    const serviceSignature = serviceOptionsSignature(this._hass);
    this._lastEntityId = this._config.entity;
    this._lastOptionSignature = attributeOptionsSignature(entity);
    this._lastLanguage = language;
    this._lastServiceSignature = serviceSignature;
    this._root.innerHTML = `
      <style>
        :host { display: block; }
      </style>
      <ha-form></ha-form>
    `;
    const form = this._root.querySelector("ha-form");
    form.hass = this._hass;
    const data = this.editorData(this._config);
    const expandContent = this._expandContentOnNextRender;
    const expandSlider = this._expandSliderOnNextRender;
    this._expandContentOnNextRender = false;
    this._expandSliderOnNextRender = false;
    form.data = data;
    form.schema = editorSchema(entity, data, expandContent, expandSlider, language, this._hass);
    form.computeLabel = (schema) => computeLabel(schema, language);
    form.computeHelper = (schema) => schema.name === "attribute" ? void 0 : computeHelper(schema, language);
    this.updateSliderAttributePicker(form, entity, language);
    this.updateSliderValueSourceToggle(form, data.slider?.value_source || sliderValueSourceFromConfig(data, entity));
    form.addEventListener("value-changed", (ev) => {
      ev.stopPropagation();
      const rawEditorValue = ev.detail.value;
      const selectedEntity = rawEditorValue.entity && this._hass ? this._hass.states[rawEditorValue.entity] : void 0;
      const previousValueSource = this.editorSliderValueSource(this._config, selectedEntity);
      const nextValueSource = rawEditorValue.slider?.value_source ?? previousValueSource;
      const editorValue = {
        ...rawEditorValue,
        slider: {
          ...rawEditorValue.slider || {},
          value_source: nextValueSource
        }
      };
      this._sliderValueSourceOverride = {
        entityId: editorValue.entity,
        source: nextValueSource
      };
      const selectedDefaultAttribute = defaultSliderAttribute(selectedEntity);
      const selectedDefaultSliderAttribute = !!selectedDefaultAttribute && editorValue.slider?.attribute === selectedDefaultAttribute;
      const needsFormDataRefresh = rawEditorValue.slider?.value_source === void 0 || selectedDefaultSliderAttribute;
      const nextConfig = this.configFromEditorData(editorValue);
      const needsContentSchemaRender = false;
      const needsSliderSchemaRender = nextValueSource !== previousValueSource;
      const needsSchemaRender = needsContentSchemaRender || needsSliderSchemaRender;
      this._config = nextConfig;
      this._lastDispatchedConfigSignature = this.configSignature(nextConfig);
      const nextEntityId = nextConfig.entity;
      this.dispatchConfigChanged(nextConfig);
      if (!needsSchemaRender && needsFormDataRefresh) {
        form.data = this.editorData(nextConfig);
        this.updateSliderAttributePicker(form, selectedEntity, language);
      }
      this.updateSliderValueSourceToggle(form, nextValueSource);
      if (nextEntityId !== this._lastEntityId || needsSchemaRender) {
        this._lastEntityId = nextEntityId;
        this._expandContentOnNextRender = needsContentSchemaRender;
        this._expandSliderOnNextRender = needsSliderSchemaRender;
        this.render();
      }
    });
  }
  findFormSelector(form, name) {
    const findSelector = (root) => {
      const directSelector = Array.from(root.querySelectorAll?.("ha-selector") || []).find((selector) => selector.name === name);
      if (directSelector) return directSelector;
      const elements = Array.from(root.querySelectorAll?.("*") || []);
      for (const element of elements) {
        if (!element.shadowRoot) continue;
        const selector = findSelector(element.shadowRoot);
        if (selector) return selector;
      }
      return void 0;
    };
    return form.shadowRoot ? findSelector(form.shadowRoot) : void 0;
  }
  updateSliderValueSourceToggle(form, source) {
    if (typeof window === "undefined") return;
    const applyValue = (attemptsLeft) => {
      const selector = this.findFormSelector(form, "value_source");
      const buttonToggle = selector?.shadowRoot?.querySelector("ha-selector-button_toggle");
      const buttonGroup = buttonToggle?.shadowRoot?.querySelector("ha-button-toggle-group");
      if (!selector || !buttonToggle || !buttonGroup) {
        if (attemptsLeft > 0) window.requestAnimationFrame(() => applyValue(attemptsLeft - 1));
        return;
      }
      selector.value = source;
      buttonToggle.value = source;
      buttonGroup.active = source;
      selector.requestUpdate?.();
      buttonToggle.requestUpdate?.();
      buttonGroup.requestUpdate?.();
    };
    window.requestAnimationFrame(() => applyValue(5));
  }
  updateSliderAttributePicker(form, entity, language) {
    if (typeof window === "undefined") return;
    const placeholder = sliderAttributePlaceholder(entity, this._hass, language);
    const label = translate(language, "labels", "attribute");
    const applyPlaceholder = (attemptsLeft) => {
      const attributeSelector = this.findFormSelector(form, "attribute");
      const selectorSelect = attributeSelector?.shadowRoot?.querySelector("ha-selector-select");
      const picker = selectorSelect?.shadowRoot?.querySelector("ha-generic-picker");
      if (!picker) {
        if (attemptsLeft > 0) window.requestAnimationFrame(() => applyPlaceholder(attemptsLeft - 1));
        return;
      }
      picker.label = label;
      picker.placeholder = placeholder;
      picker.useTopLabel = true;
      picker.valueRenderer = (value) => {
        const span = document.createElement("span");
        span.slot = "headline";
        span.textContent = entity ? attributeLabel(entity, value, this._hass, language) : value;
        return span;
      };
      picker.allowCustomValue = false;
      const pickerField = picker.shadowRoot?.querySelector("ha-picker-field");
      if (pickerField) {
        pickerField.label = label;
        pickerField.placeholder = placeholder;
        pickerField.valueRenderer = picker.valueRenderer;
        pickerField.requestUpdate?.();
      }
      picker.requestUpdate?.();
    };
    window.requestAnimationFrame(() => applyPlaceholder(5));
  }
};
var TileSliderCard = class extends HTMLElement {
  constructor() {
    super(...arguments);
    this._dragging = false;
    this._hasRendered = false;
    this._renderQueued = false;
  }
  static getStubConfig(hass) {
    const preferredDomains = [
      "cover.",
      "light.",
      "fan.",
      "climate.",
      "input_number.",
      "number."
    ];
    const entity = preferredDomains.map(
      (domain) => Object.keys(hass?.states || {}).find((entityId) => entityId.startsWith(domain))
    ).find(Boolean);
    return {
      type: "custom:tile-slider-card",
      ...entity ? { entity } : {},
      state: { show: true },
      slider: { controllable: true },
      features_position: "inline"
    };
  }
  static async getConfigElement() {
    return document.createElement("tile-slider-card-editor");
  }
  setConfig(config) {
    this._config = {
      state: { show: true },
      slider: { controllable: true },
      features_position: "inline",
      ...config
    };
    this._hasRendered = false;
    this._lastRenderSignature = void 0;
    this._lastFillRight = void 0;
    this.requestRender();
  }
  set hass(hass) {
    this._hass = hass;
    if (this._dragging || !this._config) return;
    const entity = this._config.entity ? hass.states[this._config.entity] : void 0;
    const nextSignature = this.renderSignature(entity);
    if (!this._hasRendered || nextSignature !== this._lastRenderSignature) {
      this.requestRender();
    }
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    const vertical = this._config?.vertical === true;
    return {
      rows: vertical ? 2 : 1,
      columns: 6,
      min_rows: 1,
      max_rows: vertical ? 2 : 1,
      min_columns: 3,
      max_columns: 12
    };
  }
  render() {
    if (!this._config || !this._hass) return;
    if (!this._root) this._root = this.attachShadow({ mode: "open" });
    const entity = this._config.entity ? this._hass.states[this._config.entity] : void 0;
    this._hasRendered = true;
    this._lastRenderSignature = this.renderSignature(entity);
    if (!this._config.entity) {
      const lang = this.getUserLanguage();
      const errorCard = document.createElement("hui-error-card");
      errorCard.setConfig({
        type: "error",
        error: translate(lang, "errors", "error_title"),
        description: translate(lang, "errors", "error_message")
      });
      this._root.innerHTML = "";
      this._root.appendChild(errorCard);
      return;
    }
    if (!entity) {
      const entityNotFound = translate(this.getUserLanguage(), "messages", "entity_not_found");
      this._root.innerHTML = `<ha-card class="tile-slider-card"><div class="tile error">${this.escape(entityNotFound)}: ${this.escape(this._config.entity)}</div></ha-card>`;
      return;
    }
    const name = this.entityName(entity);
    const icon = this._config.icon;
    const picture = this._config.show_entity_picture ? this.entityPicture(entity) : void 0;
    const slider = this.sliderInfo(entity);
    const active = this.isActive(entity);
    const useLegacyStateLine = this.shouldUseLegacyStateLine();
    const stateDisplayContent = useLegacyStateLine ? void 0 : this.stateDisplayContent(entity);
    const stateLine = useLegacyStateLine ? this.buildLegacyStateLine(entity) : stateDisplayContent === null ? "" : '<state-display class="state-display"></state-display>';
    const canSlide = !!slider;
    const percent = canSlide && slider ? this.clamp((slider.value - slider.min) / (slider.max - slider.min) * 100, 0, 100) : 0;
    const nextFillRight = 100 - percent;
    const initialFillRight = this._lastFillRight ?? nextFillRight;
    const controllable = this.sliderControllable(entity);
    const vertical = this._config.vertical === true;
    const activeColor = this.activeColor(this._config.color, entity);
    const inactiveColor = this.inactiveColor(this._config.color, entity);
    const language = this.getUserLanguage();
    const iconHasAction = this.hasIconAction();
    const hideSliderColor = this._config.hide_slider_when_off === true && entity.state === "off";
    this._root.innerHTML = `
      <style>${this.styles()}</style>
      <ha-card class="tile-slider-card ${active ? "active" : "inactive"} ${canSlide ? "has-slider" : ""} ${vertical ? "vertical" : ""} ${hideSliderColor ? "hide-slider-color" : ""}" style="--tile-slider-active-color:${this.escapeAttribute(activeColor)}; --tile-slider-inactive-color:${this.escapeAttribute(inactiveColor)}">
        <div class="fill" style="right:${initialFillRight}%"></div>
        <div class="tile" role="button" tabindex="0">
          ${entity.state === "unavailable" ? `<ha-tile-badge class="tile-badge"><ha-icon icon="mdi:exclamation-thick"></ha-icon></ha-tile-badge>` : ""}
          <button class="icon-button ${iconHasAction ? "" : "no-action"}" aria-label="${this.escapeAttribute(translate(language, "aria", "icon_action"))}">
            ${picture ? `<img class="entity-picture" src="${this.escapeAttribute(picture)}" alt="" />` : icon ? `<ha-icon icon="${this.escapeAttribute(icon)}"></ha-icon>` : "<ha-state-icon></ha-state-icon>"}
          </button>
          <div class="content">
            <div class="name">${this.escape(name)}</div>
            <div class="state-line">${stateLine}</div>
          </div>
          ${canSlide ? `<input class="slider" type="range" min="${slider.min}" max="${slider.max}" step="${slider.step}" value="${slider.value}" ${controllable ? "" : "disabled"} aria-label="${this.escapeAttribute(translate(language, "aria", "slider"))}" />` : ""}
        </div>
      </ha-card>
    `;
    const card = this._root.querySelector(".tile");
    const iconButton = this._root.querySelector(".icon-button");
    const stateIcon = this._root.querySelector("ha-state-icon");
    const stateDisplay = this._root.querySelector("state-display");
    const input = this._root.querySelector(".slider");
    const fill = this._root.querySelector(".fill");
    if (fill) {
      const applyNextFill = () => {
        fill.style.right = `${nextFillRight}%`;
        this._lastFillRight = nextFillRight;
      };
      if (initialFillRight !== nextFillRight && typeof window !== "undefined" && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => window.requestAnimationFrame(applyNextFill));
      } else {
        applyNextFill();
      }
    }
    if (stateIcon) {
      stateIcon.hass = this._hass;
      stateIcon.stateObj = entity;
      stateIcon.state = entity;
    }
    if (stateDisplay) {
      stateDisplay.hass = this._hass;
      stateDisplay.stateObj = entity;
      stateDisplay.content = stateDisplayContent === void 0 ? void 0 : stateDisplayContent;
      stateDisplay.name = name;
    }
    if (card) this.attachActionListeners(card, entity, "tile", iconHasAction ? ".icon-button,.slider" : ".slider");
    if (iconButton && iconHasAction) this.attachActionListeners(iconButton, entity, "icon");
    let sliderPointer;
    const updateFill = (value) => {
      if (fill && slider) {
        const nextPercent = this.clamp((value - slider.min) / (slider.max - slider.min) * 100, 0, 100);
        const right = 100 - nextPercent;
        fill.style.right = `${right}%`;
        this._lastFillRight = right;
      }
    };
    const sliderStepPrecision = () => {
      if (!slider) return 0;
      const stepText = String(slider.step);
      if (stepText.includes("e-")) return Number(stepText.split("e-")[1]);
      return stepText.includes(".") ? stepText.split(".")[1].length : 0;
    };
    const valueFromPointer = (clientX) => {
      if (!input || !slider) return 0;
      const rect = input.getBoundingClientRect();
      const ratio = rect.width > 0 ? this.clamp((clientX - rect.left) / rect.width, 0, 1) : 0;
      const rawValue = slider.min + ratio * (slider.max - slider.min);
      const step = Number(slider.step);
      if (!Number.isFinite(step) || step <= 0) return this.clamp(rawValue, slider.min, slider.max);
      const snapped = slider.min + Math.round((rawValue - slider.min) / step) * step;
      return Number(this.clamp(snapped, slider.min, slider.max).toFixed(sliderStepPrecision()));
    };
    const setInputValue = (value) => {
      if (!input) return;
      input.value = String(value);
      updateFill(value);
    };
    input?.addEventListener("input", () => {
      if (sliderPointer) return;
      updateFill(Number(input.value));
    });
    input?.addEventListener("pointerdown", (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!slider) return;
      const startValue = Number(input.value);
      this._dragging = true;
      this.toggleAttribute("dragging-slider", true);
      sliderPointer = {
        id: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        startValue,
        value: startValue,
        moved: false
      };
      input.setPointerCapture?.(ev.pointerId);
    });
    input?.addEventListener("pointermove", (ev) => {
      if (!sliderPointer || sliderPointer.id !== ev.pointerId) return;
      ev.preventDefault();
      const distance = Math.hypot(ev.clientX - sliderPointer.startX, ev.clientY - sliderPointer.startY);
      if (distance < 4 && !sliderPointer.moved) return;
      sliderPointer.moved = true;
      sliderPointer.value = valueFromPointer(ev.clientX);
      setInputValue(sliderPointer.value);
    });
    input?.addEventListener("change", async () => {
      if (sliderPointer) return;
      await this.setValue(entity, Number(input.value));
    });
    input?.addEventListener("pointerup", async (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (document.activeElement === input) input.blur();
      input.releasePointerCapture?.(ev.pointerId);
      if (!sliderPointer || sliderPointer.id !== ev.pointerId) return;
      const pointer = sliderPointer;
      sliderPointer = void 0;
      this._dragging = false;
      this.toggleAttribute("dragging-slider", false);
      if (!pointer.moved) {
        setInputValue(pointer.startValue);
        this.dispatchHassAction(entity, "tile", "tap");
        return;
      }
      await this.setValue(entity, pointer.value);
    });
    input?.addEventListener("pointercancel", (ev) => {
      if (!sliderPointer || sliderPointer.id !== ev.pointerId) return;
      setInputValue(sliderPointer.startValue);
      sliderPointer = void 0;
      this._dragging = false;
      this.toggleAttribute("dragging-slider", false);
    });
    input?.addEventListener("click", (ev) => {
      ev.stopPropagation();
    });
  }
  attachActionListeners(element, entity, surface, ignoreSelector) {
    let holdTimer;
    let tapTimer;
    let held = false;
    let trackingPointer;
    const shouldIgnore = (ev) => {
      const target = ev.target;
      return !!ignoreSelector && !!target?.closest(ignoreSelector);
    };
    const clearHoldTimer = () => {
      if (holdTimer !== void 0) {
        window.clearTimeout(holdTimer);
        holdTimer = void 0;
      }
    };
    const clearTapTimer = () => {
      if (tapTimer !== void 0) {
        window.clearTimeout(tapTimer);
        tapTimer = void 0;
      }
    };
    element.addEventListener("pointerdown", (ev) => {
      if (shouldIgnore(ev) || ev.button !== 0) return;
      if (surface === "icon") ev.stopPropagation();
      held = false;
      trackingPointer = ev.pointerId;
      element.setPointerCapture?.(ev.pointerId);
      clearHoldTimer();
      holdTimer = window.setTimeout(() => {
        held = true;
        clearTapTimer();
        this.dispatchHassAction(entity, surface, "hold");
      }, 500);
    });
    element.addEventListener("pointerup", (ev) => {
      if (shouldIgnore(ev) || trackingPointer !== ev.pointerId) return;
      if (surface === "icon") ev.stopPropagation();
      clearHoldTimer();
      element.releasePointerCapture?.(ev.pointerId);
      trackingPointer = void 0;
      if (held) {
        ev.preventDefault();
        return;
      }
      if (tapTimer !== void 0) {
        clearTapTimer();
        this.dispatchHassAction(entity, surface, "double_tap");
        return;
      }
      tapTimer = window.setTimeout(() => {
        tapTimer = void 0;
        this.dispatchHassAction(entity, surface, "tap");
      }, 250);
    });
    const cancelPointer = (ev) => {
      if (trackingPointer !== ev.pointerId) return;
      clearHoldTimer();
      trackingPointer = void 0;
    };
    element.addEventListener("pointercancel", cancelPointer);
    element.addEventListener("lostpointercapture", () => {
      clearHoldTimer();
      trackingPointer = void 0;
    });
    element.addEventListener("contextmenu", (ev) => {
      if (shouldIgnore(ev)) return;
      ev.preventDefault();
      if (surface === "icon") ev.stopPropagation();
      clearHoldTimer();
      clearTapTimer();
      if (!held) this.dispatchHassAction(entity, surface, "hold");
      held = true;
    });
    element.addEventListener("click", (ev) => {
      if (ev.detail !== 0 || shouldIgnore(ev)) return;
      if (surface === "icon") ev.stopPropagation();
      this.dispatchHassAction(entity, surface, "tap");
    });
  }
  dispatchHassAction(entity, surface, action) {
    this.dispatchEvent(new CustomEvent("hass-action", {
      bubbles: true,
      composed: true,
      detail: {
        config: this.actionConfig(entity, surface),
        action
      }
    }));
  }
  actionHasEffect(action) {
    const normalized = this.normalizeActionConfig(action);
    return !!normalized?.action && normalized.action !== "none";
  }
  hasIconAction() {
    const config = this._config || {};
    const tapAction = this.normalizeActionConfig(config.icon_tap_action || config.icon_action) || { action: "toggle" };
    return this.actionHasEffect(tapAction) || this.actionHasEffect(config.icon_hold_action) || this.actionHasEffect(config.icon_double_tap_action);
  }
  actionConfig(entity, surface) {
    const config = this._config || {};
    if (surface === "icon") {
      return {
        entity: entity.entity_id,
        tap_action: this.normalizeActionConfig(config.icon_tap_action || config.icon_action) || { action: "toggle" },
        hold_action: this.normalizeActionConfig(config.icon_hold_action),
        double_tap_action: this.normalizeActionConfig(config.icon_double_tap_action)
      };
    }
    return {
      entity: entity.entity_id,
      tap_action: this.normalizeActionConfig(config.tap_action) || { action: "more-info" },
      hold_action: this.normalizeActionConfig(config.hold_action),
      double_tap_action: this.normalizeActionConfig(config.double_tap_action)
    };
  }
  normalizeActionConfig(action) {
    if (!action) return void 0;
    if (action.action !== "call-service") return action;
    const normalized = {
      ...action,
      action: "perform-action",
      perform_action: action.perform_action || action.service,
      data: action.data || action.service_data
    };
    delete normalized.service;
    delete normalized.service_data;
    return normalized;
  }
  requestRender() {
    if (this._renderQueued) return;
    this._renderQueued = true;
    const run = () => {
      this._renderQueued = false;
      if (!this._dragging) this.render();
    };
    if (typeof window !== "undefined" && window.requestAnimationFrame) {
      window.requestAnimationFrame(run);
    } else {
      setTimeout(run, 0);
    }
  }
  renderSignature(entity) {
    if (!this._config) return "";
    const language = this.getUserLanguage();
    if (!entity) return `missing:${this._config.entity}:${language}`;
    const attrs = entity.attributes || {};
    const sliderAttribute = this.sliderAttribute(entity);
    const configuredAttributes = this.attributeConfigs().map((attr) => typeof attr === "string" ? attr : attr.attribute);
    const watchedAttributes = /* @__PURE__ */ new Set([
      "friendly_name",
      "icon",
      "entity_picture",
      "picture",
      "image",
      "image_url",
      "rgb_color",
      "rgbw_color",
      "rgbww_color",
      "hs_color",
      "unit_of_measurement",
      "min_temp",
      "max_temp",
      "target_temp_step",
      ...configuredAttributes
    ]);
    if (sliderAttribute && sliderAttribute !== "state") {
      watchedAttributes.add(sliderAttribute);
    }
    for (const attr of Object.keys(attrs)) watchedAttributes.add(attr);
    const watched = {};
    for (const attr of watchedAttributes) watched[attr] = attrs[attr];
    return JSON.stringify({
      entity_id: entity.entity_id,
      language,
      state: entity.state,
      name: this.entityName(entity),
      slider_state: sliderAttribute === "state" ? entity.state : void 0,
      attributes: watched
    });
  }
  entityName(entity) {
    const configuredName = this._config?.name;
    if (this._hass?.formatEntityName) {
      return this._hass.formatEntityName(entity, configuredName);
    }
    return this.entityNameFallback(entity, configuredName);
  }
  entityNameFallback(entity, configuredName) {
    if (configuredName === void 0) return entity.attributes.friendly_name || entity.entity_id;
    if (typeof configuredName === "string") return configuredName;
    const items = Array.isArray(configuredName) ? configuredName : [configuredName];
    const parts = items.map((item) => this.entityNameItemFallback(entity, item)).filter(Boolean);
    return parts.join(" ");
  }
  entityNameItemFallback(entity, item) {
    if (typeof item === "string") return item;
    if (item.type === "text") return item.text;
    if (item.type === "entity") return entity.attributes.friendly_name || entity.entity_id;
    const entityEntry = this._hass?.entities?.[entity.entity_id];
    const device = entityEntry?.device_id ? this._hass?.devices?.[entityEntry.device_id] : void 0;
    const areaId = entityEntry?.area_id || device?.area_id;
    const area = areaId ? this._hass?.areas?.[areaId] : void 0;
    const floor = area?.floor_id ? this._hass?.floors?.[area.floor_id] : void 0;
    if (item.type === "device") return device?.name_by_user || device?.name;
    if (item.type === "area") return area?.name;
    if (item.type === "floor") return floor?.name;
    return void 0;
  }
  sliderAttribute(entity) {
    const cfg = this._config?.slider || {};
    if (cfg.value_source === "state") return "state";
    if (cfg.value_source === "attribute") {
      if (cfg.attribute && cfg.attribute !== "state") return cfg.attribute;
      const defaultAttribute = defaultSliderAttribute(entity);
      return defaultAttribute === "state" ? void 0 : defaultAttribute;
    }
    if (cfg.attribute) return cfg.attribute;
    return defaultSliderAttribute(entity);
  }
  sliderInfo(entity) {
    const cfg = this._config?.slider || {};
    const domain = entity.entity_id.split(".")[0];
    let attribute = this.sliderAttribute(entity);
    let min = cfg.min;
    let max = cfg.max;
    let step = cfg.step ?? 1;
    let value;
    if (!attribute) return null;
    value = attribute === "state" ? Number(entity.state) : Number(entity.attributes[attribute]);
    if (!Number.isFinite(value)) return null;
    const usesTemperatureDefaults = (domain === "climate" || domain === "water_heater") && (attribute === "temperature" || attribute === "current_temperature");
    if (min === void 0) {
      if (attribute === "brightness") min = 0;
      else if (usesTemperatureDefaults) min = numberFromAttribute(entity, "min_temp", 5);
      else min = 0;
    }
    if (max === void 0) {
      if (attribute === "brightness") max = 255;
      else if (usesTemperatureDefaults) max = defaultTemperatureSliderValues(entity).max;
      else if (domain === "sensor" && attribute === "state") max = this.defaultSensorMax(value, entity.attributes.unit_of_measurement);
      else max = 100;
    }
    if (usesTemperatureDefaults) step = cfg.step ?? numberFromAttribute(entity, "target_temp_step", 0.5);
    return { attribute, value, min, max, step };
  }
  sliderControllable(entity) {
    if (entity.entity_id.split(".")[0] === "sensor") return false;
    return this._config?.slider?.controllable !== false;
  }
  isMeasurementSensor(entity) {
    if (entity.entity_id.split(".")[0] !== "sensor") return false;
    if (!Number.isFinite(Number(entity.state))) return false;
    const attrs = entity.attributes || {};
    const stateClass = String(attrs.state_class || "");
    const deviceClass = String(attrs.device_class || "");
    const unit = String(attrs.unit_of_measurement || "").toLowerCase();
    const measurementUnits = /* @__PURE__ */ new Set(["w", "kw", "wh", "kwh", "mw", "var", "kvar", "va", "kva"]);
    return stateClass === "measurement" || ["power", "energy", "apparent_power", "reactive_power"].includes(deviceClass) || measurementUnits.has(unit);
  }
  defaultSensorMax(value, unit) {
    const absValue = Math.abs(value);
    const normalizedUnit = String(unit || "").toLowerCase();
    if (normalizedUnit === "w") {
      if (absValue <= 1e3) return 1e3;
      if (absValue <= 5e3) return 5e3;
      return Math.ceil(absValue / 1e3) * 1e3;
    }
    if (normalizedUnit === "kw") {
      if (absValue <= 1) return 1;
      if (absValue <= 5) return 5;
      return Math.ceil(absValue);
    }
    if (normalizedUnit === "wh") {
      if (absValue <= 1e3) return 1e3;
      return Math.ceil(absValue / 1e3) * 1e3;
    }
    if (normalizedUnit === "kwh") {
      if (absValue <= 10) return 10;
      return Math.ceil(absValue / 10) * 10;
    }
    if (absValue <= 100) return 100;
    if (absValue <= 1e3) return 1e3;
    return Math.ceil(absValue / 100) * 100;
  }
  async setValue(entity, value) {
    if (!this._hass || !this._config) return;
    const domain = entity.entity_id.split(".")[0];
    const cfg = this._config.slider || {};
    if (cfg.service) {
      const [svcDomain, svcName] = cfg.service.split(".");
      const data = this.templateData(cfg.service_data || {}, value, entity);
      await this._hass.callService(svcDomain, svcName, { entity_id: entity.entity_id, ...data });
      return;
    }
    if (domain === "light") await this._hass.callService("light", "turn_on", { entity_id: entity.entity_id, brightness: Math.round(value) });
    else if (domain === "cover") await this._hass.callService("cover", "set_cover_position", { entity_id: entity.entity_id, position: Math.round(value) });
    else if (domain === "climate") await this._hass.callService("climate", "set_temperature", { entity_id: entity.entity_id, temperature: value });
    else if (domain === "water_heater") await this._hass.callService("water_heater", "set_temperature", { entity_id: entity.entity_id, temperature: value });
    else if (domain === "fan") await this._hass.callService("fan", "set_percentage", { entity_id: entity.entity_id, percentage: Math.round(value) });
    else if (domain === "input_number") await this._hass.callService("input_number", "set_value", { entity_id: entity.entity_id, value });
    else if (domain === "number") await this._hass.callService("number", "set_value", { entity_id: entity.entity_id, value });
  }
  shouldUseLegacyStateLine() {
    return this.stateContentItems().length === 0 && this.legacyAttributeConfigs().length > 0;
  }
  stateDisplayContent(entity) {
    const stateContent = this.stateContentItems();
    if (stateContent.length) {
      const content = this.shouldShowState(entity) ? stateContent : stateContent.filter((item) => item !== "state");
      if (!content.length) return null;
      return content.length === 1 ? content[0] : content;
    }
    return this.shouldShowState(entity) ? void 0 : null;
  }
  buildLegacyStateLine(entity) {
    const parts = [];
    const stateContent = this.stateContentItems();
    if (stateContent.length) {
      for (const item of stateContent) {
        const part = this.stateContentPart(entity, item);
        if (part) parts.push(this.escape(part));
      }
    } else {
      const state = this.stateContentPart(entity, "state");
      if (state) parts.push(this.escape(state));
      for (const attr of this.legacyAttributeConfigs()) {
        const part = this.stateContentPart(entity, attr);
        if (part) parts.push(this.escape(part));
      }
    }
    return parts.join('<span class="dot"> \u2E31 </span>');
  }
  stateContentPart(entity, attr) {
    const cfg = typeof attr === "string" ? { attribute: attr } : attr;
    if (cfg.attribute === "state") {
      if (!this.shouldShowState(entity)) return void 0;
      return this.translateState(entity);
    }
    let raw = entity.attributes[cfg.attribute];
    if (raw === void 0 || raw === null || raw === "") return void 0;
    if (typeof attr === "string") {
      const formattedAttribute = this._hass?.formatEntityAttributeValue?.(entity, attr);
      if (formattedAttribute) return formattedAttribute;
    }
    if (cfg.attribute === "brightness" && typeof raw === "number") {
      raw = Math.round(raw * 100 / 255);
    }
    const unit = cfg.unit ?? this.attributeUnit(entity, cfg.attribute);
    const label = cfg.name ? `${cfg.name} ` : "";
    return `${label}${this.formatValue(raw, cfg.format, unit)}${unit ? unit : ""}`;
  }
  shouldShowState(entity) {
    const hideStateBecauseOff = this._config?.hide_state_when_off === true && entity.state === "off";
    return this._config?.hide_state !== true && this._config?.state?.show !== false && !hideStateBecauseOff;
  }
  attributeConfigs() {
    const stateContent = this.stateContentItems();
    if (stateContent.length) return stateContent.filter((item) => item !== "state");
    return this.legacyAttributeConfigs();
  }
  stateContentItems() {
    const content = this._config?.state_content;
    if (Array.isArray(content)) return content.filter((item) => typeof item === "string" && item);
    if (typeof content === "string" && content) return [content];
    return [];
  }
  legacyAttributeConfigs() {
    const configs = [];
    const displayAttributes = [
      this._config?.display_attribute,
      this._config?.display_attribute_2,
      this._config?.display_attribute_3
    ];
    const attrs = this._config?.attributes;
    for (const displayAttribute of displayAttributes) {
      if (displayAttribute) configs.push(displayAttribute);
    }
    if (Array.isArray(attrs)) configs.push(...attrs);
    else if (typeof attrs === "string") configs.push(attrs);
    else if (attrs && typeof attrs === "object" && "attribute" in attrs) configs.push(attrs);
    const seen = /* @__PURE__ */ new Set();
    return configs.filter((attr) => {
      const key = typeof attr === "string" ? attr : attr.attribute;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  translateState(entity) {
    const domain = entity.entity_id.split(".")[0];
    const state = entity.state;
    const formattedState = this._hass?.formatEntityState?.(entity);
    if (formattedState) return formattedState;
    const localize = this._hass?.localize;
    if (localize) {
      const deviceClass = entity.attributes?.device_class;
      const keys = [
        ...typeof deviceClass === "string" ? [`component.${domain}.entity_component.${deviceClass}.state.${state}`] : [],
        `component.${domain}.entity_component._.state.${state}`,
        `component.${domain}.state.${state}`,
        `state.default.${state}`,
        `ui.components.${domain}.state.${state}`,
        `ui.components.state.default.${state}`
      ];
      for (const key of keys) {
        const translation = localize(key);
        if (translation && translation !== key) return translation;
      }
    }
    if (domain === "sensor" && Number.isFinite(Number(state)) && entity.attributes.unit_of_measurement) {
      return `${this.formatValue(Number(state), void 0, entity.attributes.unit_of_measurement)} ${entity.attributes.unit_of_measurement}`;
    }
    return state;
  }
  entityPicture(entity) {
    const attrs = entity.attributes || {};
    const rawPicture = attrs.entity_picture || attrs.picture || attrs.image || attrs.image_url;
    if (typeof rawPicture === "string" && rawPicture.trim()) {
      return this.resolveHassUrl(rawPicture.trim());
    }
    if (entity.entity_id.split(".")[0] === "camera") {
      return this.resolveHassUrl(`/api/camera_proxy/${entity.entity_id}`);
    }
    return void 0;
  }
  resolveHassUrl(path) {
    if (/^(https?:|data:|blob:)/i.test(path)) return path;
    return typeof this._hass?.hassUrl === "function" ? this._hass.hassUrl(path) : path;
  }
  activeColor(color, entity) {
    if (!color || color === "state") return stateActiveColor(entity);
    if (color === "entity") return this.entityColor(entity) || stateActiveColor(entity);
    if (color === "primary") return "var(--primary-color)";
    if (color === "accent") return "var(--accent-color)";
    if (color === "disabled") return "var(--disabled-color, var(--secondary-text-color))";
    if (color.startsWith("#") || color.startsWith("rgb(") || color.startsWith("rgba(") || color.startsWith("hsl(") || color.startsWith("hsla(") || color.startsWith("var(")) {
      return color;
    }
    return `var(--${color}-color, ${color})`;
  }
  inactiveColor(color, entity) {
    if (!color || color === "state") return "var(--state-inactive-color, var(--disabled-color, var(--secondary-text-color)))";
    if (color === "entity") return this.entityColor(entity) || "var(--state-inactive-color, var(--disabled-color, var(--secondary-text-color)))";
    if (color === "primary") return "var(--disabled-color, var(--secondary-text-color))";
    if (color === "accent") return "var(--disabled-color, var(--secondary-text-color))";
    if (color === "disabled") return "var(--disabled-color, var(--secondary-text-color))";
    if (color.startsWith("#") || color.startsWith("rgb(") || color.startsWith("rgba(") || color.startsWith("hsl(") || color.startsWith("hsla(") || color.startsWith("var(")) {
      return color;
    }
    return `var(--disabled-color, var(--secondary-text-color))`;
  }
  entityColor(entity) {
    if (!entity) return void 0;
    const attrs = entity.attributes || {};
    const rgb = attrs.rgb_color || attrs.rgbw_color || attrs.rgbww_color;
    if (Array.isArray(rgb) && rgb.length >= 3) {
      const [r, g, b] = rgb.map((value) => Math.round(Number(value)));
      if ([r, g, b].every((value) => Number.isFinite(value))) {
        return `rgb(${this.clamp(r, 0, 255)}, ${this.clamp(g, 0, 255)}, ${this.clamp(b, 0, 255)})`;
      }
    }
    const hs = attrs.hs_color;
    if (Array.isArray(hs) && hs.length >= 2) {
      const [r, g, b] = this.hsToRgb(Number(hs[0]), Number(hs[1]));
      return `rgb(${r}, ${g}, ${b})`;
    }
    const domain = entity.entity_id.split(".")[0];
    if (domain === "light") {
      return "#ffaa00";
    }
    if (domain === "cover") {
      return "#8e44ad";
    }
    if (domain === "climate") {
      const hvacAction = attrs.hvac_action;
      if (hvacAction === "heating") return "#ff4444";
      if (hvacAction === "cooling") return "#4444ff";
      return "#4444ff";
    }
    return stateActiveColor(entity);
  }
  hsToRgb(hue, saturation) {
    if (!Number.isFinite(hue) || !Number.isFinite(saturation)) return [255, 255, 255];
    const h = (hue % 360 + 360) % 360;
    const s = this.clamp(saturation, 0, 100) / 100;
    const c = s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = 1 - c;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }
  styles() {
    return `
      :host { display: block; }
      ha-card.tile-slider-card {
        position: relative;
        overflow: hidden;
        height: var(--tile-slider-card-height, 56px);
        min-height: var(--tile-slider-card-height, 56px);
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--ha-card-background, var(--card-background-color));
        box-sizing: border-box;
        transition:
          box-shadow 180ms ease,
          transform 180ms ease,
          background-color 180ms ease;
      }
      ha-card.tile-slider-card::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--primary-text-color);
        opacity: 0;
        pointer-events: none;
        transition: opacity 160ms ease;
      }
      ha-card.tile-slider-card:hover {
        box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, .18));
      }
      ha-card.tile-slider-card:hover::after {
        opacity: 0.02;
      }
      ha-card.tile-slider-card:active {
        transform: scale(.995);
      }
      ha-card.tile-slider-card:active::after {
        opacity: .07;
      }
      ha-card.tile-slider-card.vertical {
        --tile-slider-card-height: 96px;
      }
      .fill {
        position: absolute;
        inset: 0;
        background: color-mix(in srgb, var(--tile-slider-active-color, var(--state-active-color, var(--amber-color))) 22%, transparent);
        pointer-events: none;
        transition: right 1s ease, background-color 1s ease, filter 1s ease;
        will-change: right;
      }
      ha-card.hide-slider-color .fill {
        background: transparent;
      }
      :host([dragging-slider]) .fill {
        transition: right 1s ease, background-color 1s ease, filter 1s ease;
      }
      .tile {
        position: relative;
        display: flex;
        align-items: center;
        height: var(--tile-slider-card-height, 56px);
        min-height: var(--tile-slider-card-height, 56px);
        padding: 8px 8px;
        box-sizing: border-box;
        gap: 12px;
        cursor: pointer;
        user-select: none;
      }
      ha-card.vertical .tile {
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        padding: 10px 8px;
        text-align: center;
      }
      .tile-badge {
        position: absolute;
        top: 6px;
        --tile-badge-background-color: var(--orange-color);
        left: 32px;
        z-index: 4;
      }
      .icon-button {
        position: relative;
        top: -1px;
        left: 1px;
        flex: 0 0 auto;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgb(189, 189, 189, 0.07);
        color: var(--state-icon-color, var(--paper-item-icon-color));
        cursor: pointer;
        overflow: hidden;
        transition:
          transform 160ms cubic-bezier(.2, 0, 0, 1),
          background-color 160ms ease,
          color 160ms ease,
          box-shadow 160ms ease;
      }
      .icon-button::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: currentColor;
        opacity: 0;
        pointer-events: none;
        transition: opacity 160ms ease;
      }
      // .icon-button:hover {
      //   transform: scale(1.04);
      //   box-shadow: 0 1px 4px rgba(0, 0, 0, .16);
      // }
      .icon-button:hover::after {
        opacity: .1;
      }
      .icon-button:active {
        transform: scale(1.1);
      }
      .icon-button:active::after {
        opacity: .14;
      }
      .icon-button.no-action {
        background: transparent;
        cursor: inherit;
        box-shadow: none;
      }
      .icon-button.no-action::after {
        display: none;
      }
      .icon-button.no-action:hover,
      .icon-button.no-action:active {
        transform: none;
      }
      ha-card.active .icon-button { color: var(--tile-slider-active-color, var(--state-active-color, var(--amber-color))); }
      ha-card.inactive .icon-button { color: var(--tile-slider-inactive-color, var(--state-inactive-color, var(--disabled-color, var(--secondary-text-color)))); }
      .entity-picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .content { min-width: 0; flex: 1 1 auto; overflow: hidden; position: relative; left: -1px; top: -1px; }
      ha-card.vertical .content {
        flex: 0 1 auto;
        width: 100%;
      }
      .name {
        font-size: 14px;
        /*line-height: 20px;*/
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--primary-text-color);
        letter-spacing: 0.1px;
      }
      .state-line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: var(--ha-tile-info-secondary-font-size, var(--ha-font-size-s));
        font-weight: var(--ha-tile-info-secondary-font-weight, var(--ha-font-weight-normal));
        line-height: var(--ha-tile-info-secondary-line-height, var(--ha-line-height-condensed));
        letter-spacing: var(--ha-tile-info-secondary-letter-spacing, 0.4px);
        color: var(--ha-tile-info-secondary-color, var(--primary-text-color));
        width: 100%;
      }
      .dot { opacity: .75; }
      .slider {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
        touch-action: none;
        transition: right 1s ease, background-color 1s ease, filter 1s ease;
      }
      .slider:active ~ .content,
      .slider:focus-visible ~ .content {
        opacity: .92;
      }
      .slider:disabled { cursor: default; pointer-events: none; }
      .icon-button { z-index: 3; }
      .content {
        z-index: 1;
        pointer-events: none;
        transition: opacity 160ms ease;
      }
      .error { padding: 16px; color: var(--error-color); }
      @media (prefers-reduced-motion: reduce) {
        ha-card.tile-slider-card,
        ha-card.tile-slider-card::after,
        .fill,
        .icon-button,
        .icon-button::after,
        .content {
          transition: none;
        }
        ha-card.tile-slider-card:active,
        .icon-button:hover,
        .icon-button:active {
          transform: none;
        }
      }
    `;
  }
  isActive(entity) {
    return !["off", "0", "0.0", "closed", "unavailable", "unknown"].includes(entity.state);
  }
  attributeUnit(entity, attr) {
    if (attr.includes("temperature") || attr === "current_temperature" || attr === "temperature") return entity.attributes.unit_of_measurement || " \xB0C";
    if (attr === "brightness" || attr === "humidity") return "%";
    if (attr === "current_position" || attr === "position") return "%";
    return "";
  }
  isWattsUnit(unit) {
    const normalized = unit.trim().toLowerCase();
    return normalized === "w" || normalized === "kw" || normalized === "watts" || normalized === "watt";
  }
  formatValue(v, format, unit) {
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "object" && v !== null) return JSON.stringify(v);
    if (typeof v === "number") {
      if (unit && this.isWattsUnit(unit)) {
        return String(Math.round(v));
      }
      if (format !== void 0) {
        const digits = Number(format);
        if (Number.isFinite(digits)) {
          return (Math.round(v * 10 ** digits) / 10 ** digits).toFixed(digits);
        }
      }
      return Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10);
    }
    return String(v);
  }
  templateData(obj, value, entity) {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = v === "{{ value }}" ? value : v === "{{ entity_id }}" ? entity.entity_id : v;
    return out;
  }
  clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  escape(value) {
    return String(value).replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c]);
  }
  escapeAttribute(value) {
    return this.escape(value).replace(/`/g, "&#96;");
  }
  getUserLanguage() {
    return getPreferredLanguage(this._hass);
  }
};
if (!customElements.get("tile-slider-card-editor")) {
  customElements.define("tile-slider-card-editor", TileSliderCardEditor);
}
if (!customElements.get("tile-slider-card")) {
  customElements.define("tile-slider-card", TileSliderCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "tile-slider-card",
  name: "Tile Slider Card",
  description: "Control lights, covers, climate and more with an interactive slider",
  preview: true
});
