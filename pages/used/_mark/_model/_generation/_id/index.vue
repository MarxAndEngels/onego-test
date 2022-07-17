<template>
	<div class="container">

		<div class="wrapper__advantages">
       <advantages/>
    </div>


		<breadcrumbs :items="[
      {title:'Главная', link:'/', active:false},
      {title:'С пробегом', link:'/' + $config.used_page, active:false},
      {title:this.$route.params.mark.toUpperCase(), link:`/${$config.used_page}/${this.$route.params.mark}`, active:false},
      {title:this.$route.params.model, link:`/${$config.used_page}/${this.$route.params.mark}/${this.$route.params.model}`, active:false},
      {title:this.$route.params.generation, link:`/${$config.used_page}/${this.$route.params.mark}/${this.$route.params.model}/${this.$route.params.generation }`, active:false},
      {title: this.$route.params.mark.toUpperCase() +' '+ this.$route.params.model, link: null, active:true}
      ]" />
		<car-page :offer="offer" :loaded="loaded" :page-title="page_title"/>
	</div>
</template>
<script>
import usedOffer from '~/apollo/queries/usedOffer'

  import seoTags from "~/mixins/seoTags";

export default {
	    mixins: [seoTags],
	data() {
		return {
			loaded: true,
			offer: null
		}
	},
	async fetch() {
		let client = this.$apolloProvider.defaultClient
		let variables = {
			site_id: this.$config.site_id_used,
			dateFormat: 'j F Y года.',
			mark_slug: this.$route.params.mark,
			folder_slug: this.$route.params.model,
			external_id: Number(this.$route.params.id)
		}
		try {
			let response = await client.query(
					{
						query: usedOffer,
						variables: variables,
						fetchPolicy: 'no-cache'
					})
			this.offer = response.data.offer
			this.loaded = true;
		} catch (e) {
			console.log(e)
			this.$nuxt.error({statusCode: 404})
		}
		
	},
}
</script>
<style>
 .wrapper__advantages{
        display: block;
      }

    @media(min-width: 991px){
      .wrapper__advantages{
        display: none;
      }
  }
</style>