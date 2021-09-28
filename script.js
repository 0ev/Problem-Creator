// Vue component
var app = new Vue({
  el: '#app-wall',
  data: {
    appTitle: 'Prorblem Creator',
    code: `# Problem A.

이건 예시 문제입니다. 다음과 같이 문제를 작성하고, Latex의 기본 문법을 사용하여 수식을 적을 수 있습니다. 

$$ \\phi = \\pi ax^{2}+b $$

다음과 같이  수식을 적을 수 있고, 다음과 같이 수식을 문장에 포함할 수 있습니다 $ \\pi \\approx 3.14 $. 

그림은 다음과 같이 넣고,

![그림](https://via.placeholder.com/300x300.png?text=Example)

1. 소문제는 이렇게 만듭니다
2. 요렇게
`,
    isSeen: true,
    isSettings: false,
    actualSkin: {
      color: '#0cc',
      background: 'rgba(0, 204, 204, .4)',
      wall: 'rgba(0, 204, 204, .15)'
    },
    skins: [
      {
        color: '#0cc', 
        background: 'rgba(0, 204, 204, .4)',
        wall: 'rgba(0, 204, 204, .15',
        isActive: true
      },
      {
        color: '#0c0', 
        background: 'rgba(0, 204, 0, .4)',
        wall: 'rgba(0, 204, 0, .15',
        isActive: false
      },
      {
        color: '#f60',
        background: 'rgba(255, 102, 0, .4)',
        wall: 'rgba(255, 102, 0, .15)',
        isActive: false
      },
      {
        color: '#f0f',
        background: 'rgba(255, 0, 255, .4)',
        wall: 'rgba(255, 0, 255, .15)',
        isActive: false
      },
      {
        color: '#e00',
        background: 'rgba(204, 0, 0, .2)',
        wall: 'rgba(204, 0, 0, .15)'
      }
    ]
  },
  computed: {
    compiledOutput(){
      return marked(this.code, {sanitize: true});
    }
  },
  methods: {
    showSettings(){
      this.isSettings = ! this.isSettings;
      this.isSeen = false;
    },
    setSkin(skin){
      this.actualSkin.color = skin.color;
      this.actualSkin.background = skin.background;
      this.actualSkin.wall = skin.wall;
      // Toggle the actual active skin
      this.skins.map(function(obj){
        if(obj === skin){
          obj.isActive = true;
        }
        else{
          obj.isActive = false;
        }
      })
    },
    change(method) // javascript
      {
          var txtarea = document.getElementById("select");
          var start = txtarea.selectionStart;
          var finish = txtarea.selectionEnd;
          var allText = txtarea.value;
          var sel = allText.substring(start, finish);
          var newText
          switch (method) {
            case "bold":
              newText=allText.substring(0, start)+"**"+sel+"**"+allText.substring(finish, allText.length);
              break;
            case "italic":
              newText=allText.substring(0, start)+"*"+sel+"*"+allText.substring(finish, allText.length);
              break;
            case "quote":
              var final = "";
              var lst = sel.split("\n");
              for (const x in lst) {
                final += `\n>${lst[x]}`
              }
              final = final.substring(1);
              newText=allText.substring(0, start)+final+allText.substring(finish, allText.length);
              break;
            case "order":
              var final = "";
              var counter = 1;
              var lst = sel.split("\n");
              for (const x in lst) {
                final += `\n${counter}. ${lst[x]}`
                counter += 1
              }
              final = final.substring(1);
              newText=allText.substring(0, start)+final+allText.substring(finish, allText.length);
              break;
            case "unorder":
              var final = "";
              var lst = sel.split("\n");
              for (const x in lst) {
                final += `\n- ${lst[x]}`
              }
              final = final.substring(1);
              newText=allText.substring(0, start)+final+allText.substring(finish, allText.length);
              break;
            case "code":
              var final = "";
              var lst = sel.split("\n");
              for (const x in lst) {
                final += `\n        ${lst[x]}`
              }
              final = final.substring(1);
              newText=allText.substring(0, start)+final+allText.substring(finish, allText.length);
              break;
            case "horizontal":
              newText=allText.substring(0, start)+sel+"\n---\n"+allText.substring(finish, allText.length);
              break;
            default:
              console.log(1)
          }          
          txtarea.value=newText;
      }
  }
});
