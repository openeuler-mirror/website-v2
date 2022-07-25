<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  size: {
    type: String,
    validator(value) {
      return ['large', 'medium', 'small', 'mini'].includes(value);
    },
    default: 'medium',
  },
  type: {
    type: String,
    validator(value) {
      return ['outline', 'primary', 'secondary', 'text'].includes(value);
    },
    default: 'outline',
  },
  status: {
    type: String,
    validator(value) {
      return ['success', 'warning', 'error', 'normal'].includes(value);
    },
    default: 'normal',
  },
  nativeType: {
    type: String,
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value);
    },
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots();
const hasPrefix = computed(() => {
  return slots.prefix ? true : false;
});

const hasSuffix = computed(() => {
  return slots.suffix ? true : false;
});

const emit = defineEmits(['click']);

function onClick(e) {
  if (props.disabled) {
    return;
  }
  emit('click', e);
}

const classNames = computed(() => {
  return [
    'o-button',
    `o-button-size-${props.size}`,
    `o-button-type-${props.type}`,
    `o-button-status-${props.status}`,
    props.disabled && 'is-disabled',
    props.animation && 'animation',
  ].join(' ');
});
</script>

<template>
  <button
    :type="nativeType"
    :class="classNames"
    :style="{
      paddingLeft: hasPrefix ? '20px' : '28px',
      paddingRight: hasSuffix ? '20px' : '28px',
    }"
    @click="onClick"
  >
    <div class="wrap">
      <slot name="prefix"></slot>
      <span
        :style="{
          marginLeft: hasPrefix ? '8px' : '0',
          marginRight: hasSuffix ? '8px' : '0',
        }"
        ><slot></slot
      ></span>
      <slot name="suffix"></slot>
    </div>
  </button>
</template>

<style lang="less" scoped>
.o-button {
  padding: 11px 28px;
  line-height: 24px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid var(--o-color-text);
  color: var(--o-color-text);
  outline: none;
  cursor: pointer;
  // min-width: 120px;
  transition: color 0.2s, background-color 0.3s, border-color 0.3s;

  &:hover {
    // color: var(--o-color-brand);
    // border-color: var(--o-color-brand);
    background-color: transparent;
    .o-icon {
      transform: translateX(4px);
      transition: all 0.3s;
    }
  }

  &.o-button-status-error {
    color: #f3524d;
    border-color: #f3524d;
    background-color: transparent;

    &:hover {
      color: #b4110c;
      border-color: #b4110c;
      background-color: transparent;
    }

    &:active {
      color: #b4110c;
      border-color: #b4110c;
      background-color: transparent;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
    color: rgba(13, 141, 255, 0.7);
    border-color: rgba(13, 141, 255, 0.7);
    background-color: transparent;
  }

  &.o-button-type-primary {
    color: #ffffff;
    border-color: var(--o-color-brand);
    background-color: var(--o-color-brand);
    &:hover {
      color: #ffffff;
      border-color: #1a9aff;
      background-color: #1a9aff;
    }
    &:active {
      color: #ffffff;
      border-color: #0065bf;
      background-color: #0065bf;
    }
    &.is-disabled {
      color: rgba(255, 255, 255, 0.7);
      border-color: #cddff5;
      background-color: #cddff5;
    }
  }

  &.o-button-type-secondary {
    color: #ffffff;
    border-color: #cccccc;
    background-color: #cccccc;
    &:hover {
      color: #ffffff;
      border-color: #e5e5e5;
      background-color: #e5e5e5;
    }
    &:active {
      color: #ffffff;
      border-color: #b2b2b2;
      background-color: #b2b2b2;
    }
    &.is-disabled {
      color: rgba(255, 255, 255, 0.7);
      border-color: #b2b2b2;
      background-color: #b2b2b2;
    }
  }

  &.o-button-size-small {
    font-size: 16px;
    line-height: 24px;
    padding: 6px 16px;
    // min-width: 100px;
  }

  .wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .o-icon {
    transition: all 0.2s linear;
  }

  &.animation:hover .o-icon {
    transform: translate(4px);
  }
}
</style>
