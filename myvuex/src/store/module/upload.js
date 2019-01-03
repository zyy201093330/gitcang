import demo1 from '@/assets/id-a.png';
import demo2 from '@/assets/id-b.png';
import demo3 from '@/assets/licence-a.png';
import demo4 from '@/assets/licence-b.png';
import demo5 from '@/assets/photo.png';

const state = {
    list: [{
      src: '',
      demo: 'http://169.254.125.23:8081/id-a.png',
      desc: '身份证正面'
    }, {
      src: '',
      demo: 'http://169.254.125.23:8081/id-b.png',
      desc: '身份证反面'
    }, {
      src: '',
      demo: 'http://169.254.125.23:8081/licence-a.png',
      desc: '驾驶证正页'
    }, {
      src: '',
      demo: 'http://169.254.125.23:8081/licence-b.png',
      desc: '驾驶证副页'
    }, {
      src: '',
      demo: 'http://169.254.125.23:8081/photo.png',
      desc: '白底半身照'
    }]
}

const mutations = {
    updateList(state,payload){
        state[payload.index].src = payload.src
    }
}

export default {
    state,
    mutations
}