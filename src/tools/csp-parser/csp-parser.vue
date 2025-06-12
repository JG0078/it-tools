<template>
  <div class="csp-parser">
    <h2>Content-Security-Policy Parser</h2>
    <textarea
      v-model="header"
      rows="6"
      cols="60"
      placeholder="Paste your CSP header here"
    ></textarea>
    <br />
    <button @click="parseCSP" :disabled="!header.trim()">Parse</button>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="parsed && Object.keys(parsed).length > 0" class="result">
      <h3>Parsed Directives</h3>
      <table>
        <thead>
          <tr><th>Directive</th><th>Values</th></tr>
        </thead>
        <tbody>
          <tr v-for="(value, directive) in parsed" :key="directive">
            <td><code>{{ directive }}</code></td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="parsed">
      <p>No valid directives found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const header = ref('')
const parsed = ref<Record<string, string> | null>(null)
const error = ref('')

function parseCSP() {
  error.value = ''
  parsed.value = null

  if (!header.value.trim()) {
    error.value = 'Please enter a CSP header string.'
    return
  }

  const result: Record<string, string> = {}

  // Split by semicolon; filter out empty parts
  const parts = header.value.split(';').map((p) => p.trim()).filter(Boolean)

  if (parts.length === 0) {
    error.value = 'No directives found in the header.'
    return
  }

  for (const part of parts) {
    // Split first word as directive, rest as values
    const [directive, ...values] = part.split(/\s+/)
    if (!directive) continue

    // Combine values back into string, or show "(none)"
    result[directive] = values.length > 0 ? values.join(' ') : '(none)'
  }

  parsed.value = result
}
</script>

<style scoped>
.csp-parser {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 1rem auto;
}

textarea {
  font-family: monospace;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}

button {
  padding: 0.4rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  margin-top: 0.5rem;
  color: #b00020;
  font-weight: bold;
}

.result {
  margin-top: 1rem;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 0.5rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

code {
  background: #f4f4f4;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}
</style>
