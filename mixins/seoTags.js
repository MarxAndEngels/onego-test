import seoTag from '@/apollo/queries/seoTag.gql';

export default { 
    async asyncData({app, $config, route}) {
        
        let client = app.apolloProvider.defaultClient;
        // console.log(route)
        let seo = await client.query({ 
            query: seoTag,
            variables: {
                site_id: $config.site_id_used,
                url: route.path === '/' ? '/home' : route.path
            }
        })

        console.log(seo);
        return {title: seo.data.seoTag.title, page_title: seo.data.seoTag.page_title, description: seo.data.seoTag.description}
    },
  
    head() {
        return {
          title : this.title,
          link: [
            {
              rel: 'canonical',
              href: this.$config.domain + this.$route.fullPath.slice(1)
            }
          ],
          meta: [
            {
              hid: 'desctiption',
              name: 'description',
              content: this.description
            },
            {
              hid: 'og:type',
              property: 'og:type',
              content: 'website',
            },
            {
              hid: 'og:url',
              property: 'og:url',
              content: this.$config.domain + this.$route.fullPath.slice(1),
            },
            {
              hid: 'og:title',
              property: 'og:title',
              content: this.title,
            },
            {
              hid: 'og:description',
              property: 'og:description',
              content: this.description
            },
            {
              hid: 'og:image',
              property: 'og:image',
              content: this.$config.domain+ 'img/prevue.webp'
            },
          ]
        }
      },
 }