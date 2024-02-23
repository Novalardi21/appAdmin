<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :extensions="extensions"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>
<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
export default {
  components: { TiptapVuetify },
  props: {
    value: {
      type: String, // atau tipe data yang sesuai dengan nilai editor
      required: true,
    },
  },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),

  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>
