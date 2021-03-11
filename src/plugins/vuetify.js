import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        
        themes: {
            light: {
                primary: '#6A1B9A',
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF4081',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    icons: {
        iconfont: 'md',
    },
});
