document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#firstNew", {
        scrollTrigger: {
            trigger: "#firstNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
    gsap.to("#secondNew", {
        scrollTrigger: {
            trigger: "#secondNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
    gsap.to("#thirdNew", {
        scrollTrigger: {
            trigger: "#thirdNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
    gsap.to("#fourthNew", {
        scrollTrigger: {
            trigger: "#fourthNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
    gsap.to("#fifthNew", {
        scrollTrigger: {
            trigger: "#fifthNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
    gsap.to("#sixthNew", {
        scrollTrigger: {
            trigger: "#sixthNew",
            markers: false,
            start: "top 60%",
            end: "top 60%",
            scrub: 0,
        },
        opacity: 1,
    });
});

document.querySelector("#discord").addEventListener("mouseenter", () => {
    gsapDiscordAnimation = gsap.to("#discord", {
        duration: 2.5,
        ease: "none",
        rotation: "360deg",
        repeat: -1,
    });
});
document.querySelector("#discord").addEventListener("mouseleave", () => {
    if (gsapDiscordAnimation) {
        gsapDiscordAnimation.kill();
    }
    gsap.to("#discord", {
        duration: 1,
        ease: "none",
        rotation: "0deg",
    });
});

document.querySelector("#github").addEventListener("mouseenter", () => {
    gsapGitHubAnimation = gsap.to("#github", {
        duration: 1,
        ease: "none",
        scale: 1.25,
        repeat: -1,
        yoyo: true,
    });
});
document.querySelector("#github").addEventListener("mouseleave", () => {
    if (gsapGitHubAnimation) {
        gsapGitHubAnimation.kill();
    }
    gsap.to("#github", {
        duration: 1,
        ease: "none",
        scale: 1,
    });
});

// TRANSLATION //

$(document).ready(function(){
    $("#toggleUkraine").click(function(){
        $(".newsText").html("Новини");
        $(".depositText").html("Депозит");
        $(".lastNewsText").html("Останні новини");
        $(".firstNewsCardText").html("<strong>У Франції розпочалося судове розслідування щодо відмивання грошей, податкового шахрайства та інших зловживань на одній з найбільших бірж криптовалют Binance</strong><br><br> «Відділ економічних і фінансових злочинів паризької прокуратури (JUNALCO) заявив, що розслідування включає випадки відмивання грошей, пов’язані з торгівлею наркотиками», - вказується в повідомленні.");
        $(".secondNewsCardText").html("<strong>Токійські фондові біржі у вівторок відкрилися різким зниженням котирувань в очікуванні розпродажу акцій технологічних компаній після падіння напередодні індексу Nasdaq у США.</strong><br><br> За перші 15 хвилин торгів один з ключових фондових індексів Японії Nikkei Stock Average впав на 598,89 пункту, або на 1,51%, у порівнянні з показником на закритті торгів у понеділок.");
        $(".thirdNewsCardText").html("<strong>Ferrari заявляє, що підвищить ціни на деякі моделі на 10%, щоб компенсувати тарифи на автомобілі</strong><br><br> Ferrari заявила в четвер, що підвищить ціни на певні моделі на 10% після 1 квітня у відповідь на нові тарифи на автомобілі в США, додавши до 50 000 доларів до ціни типового Ferrari. Виробник спортивних автомобілів з Маранелло, що в Італії, заявив, що ціни залишаться незмінними для всіх автомобілів, імпортованих до 2 квітня. Після цього «комерційні умови» для трьох сімейств моделей — Ferrari 296, SF90 і Roma — «залишаться незмінними», — йдеться в повідомленні компанії.");
        $(".fourthNewsCardText").html("<strong>Нові дані підтверджують падіння довіри малого бізнесу через тарифи Трампа</strong><br><br> Повторне опитування показало, що в березні підприємці почуваються ще більш негативно, оскільки власники бізнесу, які раніше схвалювали обіцяне Трампом зниження податків і дерегуляцію, зосереджуються на збільшенні витрат, спричинених його імпортними митами.");
        $(".fifthNewsCardText").html("<strong>Акції Lululemon впали більш ніж на 10%, оскільки генеральний директор каже, що інфляція та економічні проблеми тиснуть на витрати</strong><br><br> Під час розмови про прибутки в четвер генеральний директор Келвін Макдональд сказав, що компанія спортивного одягу провела опитування на початку цього місяця, яке виявило, що споживачі витрачають менше через економічні проблеми та проблеми з інфляцією, що призвело до зниження трафіку в США в Lululemon і аналогах галузі. Проте, за його словами, гості добре відреагували на нововведення на підприємстві.");
        $(".sixthNewsCardText").html("<strong>Власники Tesla торгують своїми електромобілями на рекордних рівнях</strong><br><br> Дані Edmunds, опубліковані в четвер, свідчать, що березень представляє «найвищу частку» за всю історію обміну Tesla на нові або вживані автомобілі від дилерських центрів, що продають інші марки.");
    });
    $("#toggleEngland").click(function(){
        $(".newsText").html("News");
        $(".depositText").html("Deposit");
        $(".lastNewsText").html("Last news");
        $(".firstNewsCardText").html(`<strong>In France, a judicial investigation has begun into money laundering, tax fraud and other abuses at one of the largest cryptocurrency exchanges, Binance</strong><br><br> "The Department of Economic and Financial Crimes of the Paris Prosecutor's Office (JUNALCO) said that the investigation includes cases of money laundering related to the drug trade," the message states.`);
        $(".secondNewsCardText").html("<strong>Tokyo stock exchanges opened sharply lower on Tuesday, in anticipation of a sell-off in technology stocks after the Nasdaq index in the US fell the day before.</strong><br><br> In the first 15 minutes of trading, one of Japan's key stock indexes, the Nikkei Stock Average, fell 598.89 points, or 1.51%, compared to Monday's close.");
        $(".thirdNewsCardText").html("<strong>Ferrari says it will raise prices by 10% on some models to offset auto tariffs</strong><br><br> Ferrari said Thursday it will raise prices by 10% on certain models after April 1 in response to new U.S. auto tariffs, adding up to $50,000 to the price of a typical Ferrari. The Maranello, Italy-based sports car maker said prices will remain unchanged for all cars imported before April 2. After that, the “commercial terms” for three of its model families — the Ferrari 296, SF90 and Roma — will “remain unchanged,” the company said in a release.");
        $(".fourthNewsCardText").html("<strong>New Data Confirms Plunging Small-Business Confidence From Trump Tariffs</strong><br><br> A recurring poll showed entrepreneurs feeling even more negative in March, as business owners who previously cheered Trump’s promised tax cuts and deregulation focus on the increased costs created by his import duties.");
        $(".fifthNewsCardText").html("<strong>Lululemon shares drop more than 10% as CEO says inflation, economic concerns are weighing on spending</strong><br><br> On an Thursday earnings call, CEO Calvin McDonald said the athleticwear company conducted a survey earlier this month that found that consumers are spending less due to economic and inflation concerns, resulting in lower U.S. traffic at Lululemon and industry peers. However, he said, guests responded well to innovation at the company.");
        $(".sixthNewsCardText").html("<strong>Tesla owners are trading in their EVs at record levels</strong><br><br> The data from Edmunds published on Thursday said that March represented “the highest ever share” it had seen for Tesla trade-ins toward new or used cars from dealerships selling other brands.");
    });
});