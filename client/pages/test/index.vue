<template>
 <div>

                <v-select
                :items="states"
                v-model="e1"
                label="Select"
                single-line
            ></v-select>
            <v-btn
                color="primary" 
            >Addswift</v-btn>
 </div>
</template>

<script>
export default {
    data () {
    return {
      tab: null,
      items: [
        'web', 'shopping', 'videos', 'images', 'news'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      e1: null,
      states: [
        { text: 'State 1' },
        { text: 'State 2' },
        { text: 'State 3' },
        { text: 'State 4' },
        { text: 'State 5' },
        { text: 'State 6' },
        { text: 'State 7' }
      ],
    }
  }
}
</script>

