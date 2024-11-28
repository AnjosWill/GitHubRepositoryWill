<template>
  <div v-if="visible" class="dialog-overlay" @click.self="close">
    <div class="dialog">
      <h2 class="dialog-title">{{ dialog.title }}</h2>
      <div class="dialog-content">
        <div
          v-for="(content, index) in dialog.content"
          :key="index"
          :class="['dialog-row', content.isTotal ? 'total' : '', content.isBold ? 'bold' : '']"
        >
          <span class="dialog-label">{{ content.label }}</span>
          <span class="dialog-value">{{ content.value }}</span>
        </div>
        <p v-if="dialog.message" class="dialog-message">{{ dialog.message }}</p>
      </div>
      <div class="dialog-buttons">
        <button
          class="action-button action-button-cancel"
          v-if="dialog.cancelText"
          @click="handleCancel"
        >
          {{ dialog.cancelText }}
        </button>
        <button
          class="action-button action-button-confirm"
          v-if="dialog.confirmText"
          @click="handleConfirm"
        >
          {{ dialog.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dialog',
  data() {
    return {
      visible: false,
      dialog: {
        title: '',
        content: [] as { label: string; value: string | number }[],
        message: '',
        confirmText: '',
        cancelText: '',
        onConfirm: () => {},
        onCancel: () => {},
      },
    }
  },
  methods: {
    open({
      title,
      content = [],
      message = '',
      confirmText = '',
      cancelText = '',
      onConfirm = () => {},
      onCancel = () => {},
    }: {
      title: string
      content?: { label: string; value: string | number }[]
      message?: string
      confirmText?: string
      cancelText?: string
      onConfirm?: () => void
      onCancel?: () => void
    }) {
      this.dialog = {
        title,
        content,
        message,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
      }
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleConfirm() {
      if (this.dialog.onConfirm) this.dialog.onConfirm()
      this.close()
    },
    handleCancel() {
      if (this.dialog.onCancel) this.dialog.onCancel()
      this.close()
    },
  },
})
</script>

<style scoped>
.dialog {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.dialog-title {
  font-size: 1.25rem; /* Maior título */
  font-weight: bold;
  color: #111827;
  margin-bottom: 1.5rem;
}

.dialog-content {
  margin-bottom: 1.5rem;
  text-align: left;
}

.dialog-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.dialog-row.total {
  font-size: 1.4rem;
  font-weight: bold;
  color: #111827;
  margin-top: 1rem;
}

.dialog-row.bold {
  color: #111827;
}

.dialog-message {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 1.5rem;
}

.action-button {
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-button-confirm {
  background: #2563eb;
  color: white;
  border: none;
}

.action-button-confirm:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.action-button-cancel {
  background: transparent;
  border: 1px solid #6b7280;
  color: #6b7280;
}

.action-button-cancel:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}
</style>
