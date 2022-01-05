import React, { Component } from 'react'
import Loading from './Loading';
import NewItem from './NewItem'

export default class News extends Component {
    articles=[
        {
            "source": {
            "id": null,
            "name": "BBC News"
            },
            "author": "https://www.facebook.com/bbcnews",
            "title": "Afghanistan: Foreign Office chaotic during Kabul evacuation - whistleblower - BBC News",
            "description": "Thousands of pleas for help went unread and the foreign secretary lacked urgency, an ex-official says.",
            "url": "https://www.bbc.com/news/uk-59549868",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/17C4F/production/_121995379_kabulairport.png",
            "publishedAt": "2021-12-07T10:19:41Z",
            "content": "By James Landale &amp; Joseph LeeBBC News\r\nImage source, MOD via PA Media\r\nThe UK Foreign Office's handling of the Afghan evacuation after the Taliban seized Kabul was dysfunctional and chaotic, a wh… [+8262 chars]"
            },
            {
            "source": {
            "id": "cnn",
            "name": "CNN"
            },
            "author": "Nectar Gan, CNN",
            "title": "China threatens the US with retaliation over diplomatic boycott of Winter Olympics - CNN",
            "description": "China has threatened the Biden administration with retaliation over its decision to impose a diplomatic boycott of the 2022 Winter Olympics in Beijing, warning the move could harm bilateral relations.",
            "url": "https://www.cnn.com/2021/12/07/china/china-response-us-olympic-boycott-intl-hnk/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211207015737-beijing-winter-olympics-china-training-1203-restricted-super-tease.jpg",
            "publishedAt": "2021-12-07T09:43:00Z",
            "content": "Hong Kong (CNN)China has threatened the Biden administration with retaliation over its decision to impose a diplomatic boycott of the 2022 Winter Olympics in Beijing, warning the move could harm bila… [+4924 chars]"
            },
            {
            "source": {
            "id": null,
            "name": "CNBC"
            },
            "author": "Holly Ellyatt",
            "title": "Biden wants to prevent Russia-Ukraine conflict, but experts say time is running out - CNBC",
            "description": "There are widespread concerns about Russian military activity on the border with Ukraine and its increasingly aggressive rhetoric.",
            "url": "https://www.cnbc.com/2021/12/07/biden-aims-to-prevent-russia-ukraine-conflict-but-time-is-running-out.html",
            "urlToImage": "https://image.cnbcfm.com/api/v1/image/106985377-1638863978789-gettyimages-1236037927-RUS_Russian_President_Vladimir_Putin_Meets_Valdia_Discussion_Club_During_Annual_Meeting.jpeg?v=1638864246",
            "publishedAt": "2021-12-07T09:36:51Z",
            "content": "Russian President Vladimir Putin speeches during the Valdai Discussion Club's plenary meeting, on October,21,2021, in Sochi, Russia.\r\nU.S. President Joe Biden is expected to give Russian President Vl… [+6940 chars]"
            }
    ]

    captializeFirstLatter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        };
        document.title=`${this.captializeFirstLatter(this.props.category)}- NewsTv`;
    }

     async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1f65934b7487446eb3f867dbaa5c0997&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({articles: parseData.articles,loading:false});
    }
    handleNext= async()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1f65934b7487446eb3f867dbaa5c0997&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({
            page:this.state.page+1,
            articles: parseData.articles,
            loading:false
        })
       
    }

    handlePrev=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=1f65934b7487446eb3f867dbaa5c0997&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        let parseData=await data.json();
        this.setState({
            page:this.state.page-1,
            articles: parseData.articles,
            loading:false
        })
        
        
    }
    render() {
        return (
            <div className="container my-3">
                <h2>NewsTv - Top Headline</h2>
                <hr/>
                {this.state.loading && <Loading/>}
                <div className="row my-2">
                {!this.state.loading && this.state.articles.map((element)=>{    
                   return <div className="col-md-4" key={element.url}>
                    <NewItem title={element.title} description={element.description} 
                             imageUrl={element.urlToImage} newsUrl={element.url}
                             author={element.author} date={element.publishedAt}
                              source={element.source.name}/>
                    </div>
                })}
                 </div>
                 <div className="container d-flex justify-content-between"> 
                 <button disabled={this.state.page<=1} onClick={this.handlePrev} type="button" class="btn btn-dark">&larr; Prev</button>
                 <button onClick={this.handleNext} type="button" class="btn btn-dark">Next &rarr;</button>
                 </div>
            </div>
            
        )
    }
}
