import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine, ReferenceArea, Cell, PieChart, Pie
} from "recharts";
import {
  TrendingUp, TrendingDown, AlertTriangle, MapPin, ShoppingCart,
  Calendar, DollarSign, Package, Globe, Activity, Layers,
  Search, ChevronRight, ChevronDown, Target, Compass, Flag,
  AlertCircle, CheckCircle2, Info, Filter, GitBranch, Award,
  Lock, Briefcase, Wallet, Download, Printer
} from "lucide-react";

// ================================================================
// DATA: FWC22 (contract 99313) + FWWC23 (contract 105215)
// ================================================================
const DATA = {"meta":{"product":"Champions Badge","licensee":"Cromotransfer","cycles_loaded":["FCWC25","FIC24","FIC25","FWC22","FWWC23"],"period_covered":"Q1 2023 \u2192 Q1 2026","last_updated":"2026-05-07"},"cycles":{"FWC22":{"cycle":"FWC22","contract":"99313","product":"Champions Badge","period":"Q1 2023 \u2192 Q1 2026","total_units":4064982,"total_gross":4674058.06,"total_royalties":1236786.5,"total_overpaid":189791.6,"total_trade_off":0,"leaked_units":948958,"lines_count":103,"skus_count":4,"countries_count":10},"FWWC23":{"cycle":"FWWC23","contract":"105215","product":"Champions Badge","period":"Q3 2023 \u2192 Q1 2026","total_units":88800,"total_gross":107670.42,"total_royalties":39960.0,"total_overpaid":0,"total_trade_off":16660.0,"leaked_units":0,"lines_count":36,"skus_count":2,"countries_count":4},"FIC24":{"cycle":"FIC24","contract":"40005352","product":"Champions Badge","period":"Q2 2025 \u2192 Q4 2025","total_units":259622,"total_gross":521182.2,"total_royalties":116829.9,"total_overpaid":0,"total_trade_off":51924.4,"leaked_units":0,"lines_count":23,"skus_count":2,"countries_count":8},"FCWC25":{"cycle":"FCWC25","contract":"40005390","product":"Champions Badge","period":"Q2 2025 \u2192 Q1 2026","total_units":291568,"total_gross":1143970.24,"total_royalties":131205.6,"total_overpaid":0,"total_trade_off":0,"leaked_units":0,"lines_count":58,"skus_count":4,"countries_count":20},"FIC25":{"cycle":"FIC25","contract":"40005890","product":"Champions Badge","period":"Q4 2025 \u2192 Q1 2026","total_units":86548,"total_gross":237699.12,"total_royalties":38946.6,"total_overpaid":0,"total_trade_off":0,"leaked_units":0,"lines_count":8,"skus_count":2,"countries_count":1}},"kpis_total":{"total_units":4791520,"total_gross":6684580.04,"total_royalties":1563728.6,"net_revenue":5120851.44,"total_overpaid":189791.6,"total_trade_off":68584.4,"leaked_units":948958,"unique_skus":14,"unique_countries":25,"unique_channels":3},"quarters":[{"quarter":"Q1 2023","units":112060,"gross":220925.6,"royalties":50427.0,"fwc22_units":112060,"tpu_units":112060},{"quarter":"Q2 2023","units":20660,"gross":35664.0,"royalties":9297.0,"fwc22_units":20660,"tpu_units":20660},{"quarter":"Q3 2023","units":263980,"gross":317251.6,"royalties":118791.0,"overpaid":47471.4,"fwc22_units":258157,"ecoflex_units":237680,"tpu_units":26300,"fwwc23_units":5823},{"quarter":"Q4 2023","units":418594,"gross":468825.28,"royalties":188367.3,"overpaid":80576.8,"fwc22_units":402884,"ecoflex_units":418594,"fwwc23_units":15710},{"quarter":"Q1 2024","units":179645,"gross":201297.2,"royalties":80840.25,"overpaid":35805.6,"fwc22_units":179088,"ecoflex_units":179585,"tpu_units":60,"fwwc23_units":557},{"quarter":"Q2 2024","units":102755,"gross":115085.6,"royalties":46239.75,"overpaid":18751.0,"fwc22_units":93755,"ecoflex_units":102755,"fwwc23_units":9000},{"quarter":"Q3 2024","units":85021,"gross":95223.52,"royalties":38259.45,"overpaid":6869.0,"fwc22_units":34345,"ecoflex_units":85021,"fwwc23_units":50676},{"quarter":"Q4 2024","units":4639,"gross":5435.04,"royalties":2087.55,"overpaid":208.4,"fwc22_units":1042,"ecoflex_units":4639,"fwwc23_units":3597},{"quarter":"Q1 2025","units":754,"gross":941.34,"royalties":339.3,"overpaid":109.4,"fwc22_units":714,"ecoflex_units":587,"tpu_units":167,"fwwc23_units":40},{"quarter":"Q2 2025","units":2189869,"gross":2915909.84,"royalties":598427.45,"fwc22_units":1935068,"ecoflex_units":2045384,"fwwc23_units":2956,"fcwc25_units":144485,"tpu_units":144485,"fic24_units":107360},{"quarter":"Q3 2025","units":889612,"gross":1407079.92,"royalties":270648.6,"fwc22_units":648384,"ecoflex_units":798360,"fwwc23_units":76,"fcwc25_units":91252,"tpu_units":91252,"fic24_units":149900},{"quarter":"Q4 2025","units":323255,"gross":541616.66,"royalties":95821.55,"fwc22_units":248216,"ecoflex_units":250747,"fwwc23_units":169,"fcwc25_units":39960,"tpu_units":72508,"fic24_units":2362,"fic25_units":32548},{"quarter":"Q1 2026","units":200676,"gross":359324.44,"royalties":64182.4,"fwc22_units":130609,"ecoflex_units":130805,"fwwc23_units":196,"fic25_units":54000,"tpu_units":69871,"fcwc25_units":15871}],"skus":[{"cycle":"FWC22","ref":"E099714","units":3057785,"gross":3424958.56,"royalties":954237.85,"overpaid":189791.6,"first_qtr":"Q3 2023","last_qtr":"Q1 2026","territories":["China","Hong Kong","Thailand","Vietnam"],"channels":["Kiosk"],"material":"Ecoflex","contract":"99313","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","avg_price":1.1201,"price_points":[1.12]},{"cycle":"FWC22","ref":"E130415","units":853450,"gross":955864.0,"royalties":213362.5,"overpaid":0,"first_qtr":"Q2 2025","last_qtr":"Q1 2026","territories":["Argentina","China","Thailand","Vietnam"],"channels":["Kiosk"],"material":"Ecoflex","contract":"99313","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","avg_price":1.12,"price_points":[1.12]},{"cycle":"FIC24","ref":"E137264","units":202422,"gross":425086.2,"royalties":91089.9,"overpaid":0,"first_qtr":"Q2 2025","last_qtr":"Q4 2025","territories":["China","Colombia","Guatemala","Hong Kong","Ireland","Malaysia","Mexico","Spain"],"channels":["Distributors"],"material":"Ecoflex","contract":"40005352","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","avg_price":2.1,"price_points":[2.1]},{"cycle":"FWC22","ref":"E090976","units":152947,"gross":291075.5,"royalties":68826.15,"overpaid":0,"first_qtr":"Q1 2023","last_qtr":"Q1 2025","territories":["Argentina","Brazil","China","Hong Kong","Ireland","Thailand","United Kingdom","United States"],"channels":["B2B","Kiosk"],"material":"TPU","contract":"99313","description":".4 80036447 PATCH FIFA 2022 5.8X7.9CM DOUR/ PANT.75","avg_price":1.9031,"price_points":[1.12,1.7,1.702,2.7]},{"cycle":"FCWC25","ref":"E142562","units":139783,"gross":514396.44,"royalties":62902.35,"overpaid":0,"first_qtr":"Q2 2025","last_qtr":"Q1 2026","territories":["Argentina","Austria","Brazil","China","Colombia","Hong Kong","Ireland","Japan","Mexico","Portugal","Saudi Arabia","Singapore","South Korea","Spain","Switzerland","USA","United Arab Emirates"],"channels":["Distributors"],"material":"TPU","contract":"40005390","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","avg_price":3.68,"price_points":[3.68]},{"cycle":"FCWC25","ref":"E142198","units":129480,"gross":547700.4,"royalties":58266.0,"overpaid":0,"first_qtr":"Q3 2025","last_qtr":"Q1 2026","territories":["China","Denmark","Ireland","Malaysia","USA","United Kingdom"],"channels":["Distributors"],"material":"TPU","contract":"40005390","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","avg_price":4.23,"price_points":[4.23]},{"cycle":"FWWC23","ref":"E105470","units":83300,"gross":92820.42,"royalties":37485.0,"overpaid":0,"first_qtr":"Q3 2023","last_qtr":"Q1 2026","territories":["Cambodia","China","Thailand"],"channels":["Kiosk"],"material":"Ecoflex","contract":"105215","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","avg_price":1.1143,"price_points":[0.98,1.12]},{"cycle":"FIC25","ref":"E155217","units":70824,"gross":201848.4,"royalties":31870.8,"overpaid":0,"first_qtr":"Q4 2025","last_qtr":"Q1 2026","territories":["Ireland"],"channels":["Distributors"],"material":"TPU","contract":"40005890","description":"PATCH FIFA FIC25 7,9X6,2CM GOLD/ WHITE TPU FS (S)","avg_price":2.85,"price_points":[2.85]},{"cycle":"FIC24","ref":"E143929","units":57200,"gross":96096.0,"royalties":25740.0,"overpaid":0,"first_qtr":"Q2 2025","last_qtr":"Q3 2025","territories":["Ireland","Mexico"],"channels":["Distributors"],"material":"Ecoflex","contract":"40005352","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","avg_price":1.68,"price_points":[1.68]},{"cycle":"FIC25","ref":"E158955","units":15724,"gross":35850.72,"royalties":7075.8,"overpaid":0,"first_qtr":"Q4 2025","last_qtr":"Q1 2026","territories":["Ireland"],"channels":["Distributors"],"material":"TPU","contract":"40005890","description":"PATCH FIFA FIC25 6,3X5CM GOLD/WHITE TPU FS (S)","avg_price":2.28,"price_points":[2.28]},{"cycle":"FCWC25","ref":"E143425","units":11855,"gross":43626.4,"royalties":5334.75,"overpaid":0,"first_qtr":"Q2 2025","last_qtr":"Q2 2025","territories":["Argentina","Colombia","Ireland","Portugal","USA"],"channels":["Distributors"],"material":"TPU","contract":"40005390","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","avg_price":3.68,"price_points":[3.68]},{"cycle":"FCWC25","ref":"E145880","units":10450,"gross":38247.0,"royalties":4702.5,"overpaid":0,"first_qtr":"Q3 2025","last_qtr":"Q4 2025","territories":["Ireland","USA"],"channels":["Distributors"],"material":"TPU","contract":"40005390","description":"PATCH CWC 25 CHAMPIONS 6X6CM DOURADO/BRANCO TPU (S)","avg_price":3.66,"price_points":[3.66]},{"cycle":"FWWC23","ref":"E101394","units":5500,"gross":14850.0,"royalties":2475.0,"overpaid":0,"first_qtr":"Q3 2023","last_qtr":"Q3 2023","territories":["Ireland"],"channels":["Kiosk"],"material":"TPU","contract":"105215","description":".4 PATCH FIFA WORLD CUP 2023 5.7X7.8CM GOLD/ WHITE TPU","avg_price":2.7,"price_points":[2.7]},{"cycle":"FWC22","ref":"E101394","units":800,"gross":2160.0,"royalties":360.0,"overpaid":0,"first_qtr":"Q3 2023","last_qtr":"Q3 2023","territories":["Japan"],"channels":["Kiosk"],"material":"TPU","contract":"99313","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","avg_price":2.7,"price_points":[2.7]}],"countries":[{"country":"Thailand","units":3678745,"gross":4120093.34,"royalties":1121207.45,"cycles":["FWC22","FWWC23"]},{"country":"Ireland","units":463870,"gross":1223947.32,"royalties":208741.5,"cycles":["FCWC25","FIC24","FIC25","FWC22","FWWC23"]},{"country":"China","units":274545,"gross":318994.16,"royalties":74032.65,"cycles":["FCWC25","FIC24","FWC22","FWWC23"]},{"country":"Argentina","units":162400,"gross":284283.6,"royalties":68080.0,"cycles":["FCWC25","FWC22"]},{"country":"United Kingdom","units":72000,"gross":300735.0,"royalties":32400.0,"cycles":["FCWC25","FWC22"]},{"country":"Brazil","units":51613,"gross":187382.84,"royalties":23225.85,"cycles":["FCWC25","FWC22"]},{"country":"USA","units":25515,"gross":94440.2,"royalties":11481.75,"cycles":["FCWC25"]},{"country":"Vietnam","units":18488,"gross":20706.56,"royalties":4622.0,"cycles":["FWC22"]},{"country":"Saudi Arabia","units":10000,"gross":36800.0,"royalties":4500.0,"cycles":["FCWC25"]},{"country":"Mexico","units":6000,"gross":15730.0,"royalties":2700.0,"cycles":["FCWC25","FIC24"]},{"country":"Hong Kong","units":5086,"gross":13763.78,"royalties":2271.3,"cycles":["FCWC25","FIC24","FWC22"]},{"country":"Japan","units":4570,"gross":16033.6,"royalties":2056.5,"cycles":["FCWC25","FWC22"]},{"country":"United States","units":4000,"gross":10800.0,"royalties":1800.0,"cycles":["FWC22"]},{"country":"Spain","units":3500,"gross":8140.0,"royalties":1575.0,"cycles":["FCWC25","FIC24"]},{"country":"Portugal","units":2300,"gross":8464.0,"royalties":1035.0,"cycles":["FCWC25"]},{"country":"Colombia","units":2300,"gross":6410.0,"royalties":1035.0,"cycles":["FCWC25","FIC24"]},{"country":"Cambodia","units":2178,"gross":2134.44,"royalties":980.1,"cycles":["FWWC23"]},{"country":"South Korea","units":2000,"gross":7360.0,"royalties":900.0,"cycles":["FCWC25"]},{"country":"Singapore","units":1000,"gross":3680.0,"royalties":450.0,"cycles":["FCWC25"]},{"country":"United Arab Emirates","units":500,"gross":1840.0,"royalties":225.0,"cycles":["FCWC25"]},{"country":"Guatemala","units":270,"gross":567.0,"royalties":121.5,"cycles":["FIC24"]},{"country":"Austria","units":200,"gross":736.0,"royalties":90.0,"cycles":["FCWC25"]},{"country":"Switzerland","units":200,"gross":736.0,"royalties":90.0,"cycles":["FCWC25"]},{"country":"Malaysia","units":140,"gross":379.2,"royalties":63.0,"cycles":["FCWC25","FIC24"]},{"country":"Denmark","units":100,"gross":423.0,"royalties":45.0,"cycles":["FCWC25"]}],"channels":[{"channel":"Kiosk","units":4021062,"gross":4525138.88,"royalties":1217022.5},{"channel":"Distributors","units":637738,"gross":1902851.56,"royalties":286982.1},{"channel":"B2B","units":132720,"gross":256589.6,"royalties":59724.0}],"materials":[{"material":"Ecoflex","units":4254157,"gross":4994825.18,"royalties":1321915.25,"overpaid":189791.6},{"material":"TPU","units":537363,"gross":1689754.86,"royalties":241813.35,"overpaid":0}],"lines":[{"quarter":"Q1 2026","id":"1104642620","month":"JANUARY","year":"2026","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":67177,"gross_sales_usd":75238.24,"royalty_rate":0.25,"royalty_amount_usd":16794.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":16794.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2026","id":"1104642621","month":"JANUARY","year":"2026","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":6582,"gross_sales_usd":7371.84,"royalty_rate":0.25,"royalty_amount_usd":1645.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1645.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q1 2026","id":"1104642622","month":"JANUARY","year":"2026","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":21934,"gross_sales_usd":24566.08,"royalty_rate":0.25,"royalty_amount_usd":5483.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":5483.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2026","id":"1104642623","month":"JANUARY","year":"2026","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":7561,"gross_sales_usd":8468.32,"royalty_rate":0.25,"royalty_amount_usd":1890.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1890.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q1 2026","id":"1104642624","month":"FEBRUARY","year":"2026","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":19587,"gross_sales_usd":21937.44,"royalty_rate":0.25,"royalty_amount_usd":4896.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":4896.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2026","id":"1104642625","month":"FEBRUARY","year":"2026","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":130,"gross_sales_usd":145.6,"royalty_rate":0.25,"royalty_amount_usd":32.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":32.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q1 2026","id":"1104642626","month":"FEBRUARY","year":"2026","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Vietnam","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":247,"gross_sales_usd":276.64,"royalty_rate":0.25,"royalty_amount_usd":61.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":61.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Vietnam"},{"quarter":"Q1 2026","id":"1104642627","month":"MARCH","year":"2026","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":3368,"gross_sales_usd":3772.16,"royalty_rate":0.25,"royalty_amount_usd":842.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":842.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2026","id":"1104642628","month":"MARCH","year":"2026","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":4023,"gross_sales_usd":4505.76,"royalty_rate":0.25,"royalty_amount_usd":1005.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1005.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2024","id":"1001501165","month":"APRIL","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":6764,"gross_sales_usd":7575.68,"royalty_rate":0.45,"royalty_amount_usd":3043.8,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1691.0,"overpaid":1352.8,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2024","id":"1001501166","month":"MAY","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":73277,"gross_sales_usd":82070.24,"royalty_rate":0.45,"royalty_amount_usd":32974.65,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":18319.25,"overpaid":14655.4,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2024","id":"1001501167","month":"JUNE","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":13714,"gross_sales_usd":15359.68,"royalty_rate":0.45,"royalty_amount_usd":6171.3,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":3428.5,"overpaid":2742.8,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2023","id":"963635600","month":"JULY","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":47763,"gross_sales_usd":53494.56,"royalty_rate":0.45,"royalty_amount_usd":21493.35,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":11940.75,"overpaid":9552.6,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2023","id":"963635601","month":"AUGUST","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":11048,"gross_sales_usd":12373.76,"royalty_rate":0.45,"royalty_amount_usd":4971.6,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2762.0,"overpaid":2209.6,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2023","id":"963635602","month":"AUGUST","year":"2023","product_ref":"E101394","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Japan","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":2.7,"units":400,"gross_sales_usd":1080.0,"royalty_rate":0.45,"royalty_amount_usd":180.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":180.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Japan"},{"quarter":"Q3 2023","id":"963635603","month":"SEPTEMBER","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5.8X7.9CM DOUR/ PANT.75","territory":"South America > Argentina","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.702,"units":20000,"gross_sales_usd":34040.0,"royalty_rate":0.45,"royalty_amount_usd":9000.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":9000.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q3 2023","id":"963635604","month":"SEPTEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":1700,"gross_sales_usd":1904.0,"royalty_rate":0.45,"royalty_amount_usd":765.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":425.0,"overpaid":340.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q3 2023","id":"963635605","month":"SEPTEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":176846,"gross_sales_usd":198067.52,"royalty_rate":0.45,"royalty_amount_usd":79580.7,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":44211.5,"overpaid":35369.2,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2023","id":"963635606","month":"SEPTEMBER","year":"2023","product_ref":"E101394","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Japan","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":2.7,"units":400,"gross_sales_usd":1080.0,"royalty_rate":0.45,"royalty_amount_usd":180.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":180.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Japan"},{"quarter":"Q1 2025","id":"1046902148","month":"JANUARY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":25,"gross_sales_usd":28.0,"royalty_rate":0.45,"royalty_amount_usd":11.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":6.25,"overpaid":5.0,"leaked":true,"region":"Asia","country":"Hong Kong"},{"quarter":"Q1 2025","id":"1046902149","month":"FEBRUARY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":230,"gross_sales_usd":257.6,"royalty_rate":0.45,"royalty_amount_usd":103.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":57.5,"overpaid":46.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2025","id":"1046902150","month":"FEBRUARY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":47,"gross_sales_usd":52.64,"royalty_rate":0.45,"royalty_amount_usd":21.15,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":11.75,"overpaid":9.4,"leaked":true,"region":"Asia","country":"Hong Kong"},{"quarter":"Q1 2025","id":"1046902151","month":"MARCH","year":"2025","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/ PANT.75","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.7,"units":47,"gross_sales_usd":79.9,"royalty_rate":0.45,"royalty_amount_usd":21.15,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":21.15,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Hong Kong"},{"quarter":"Q1 2025","id":"1046902152","month":"MARCH","year":"2025","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/ PANT.75","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.7,"units":120,"gross_sales_usd":204.0,"royalty_rate":0.45,"royalty_amount_usd":54.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":54.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2025","id":"1046902153","month":"MARCH","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":80,"gross_sales_usd":89.6,"royalty_rate":0.45,"royalty_amount_usd":36.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":20.0,"overpaid":16.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2025","id":"1046902154","month":"MARCH","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA 5,8X7,9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":165,"gross_sales_usd":184.8,"royalty_rate":0.45,"royalty_amount_usd":74.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":41.25,"overpaid":33.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2024","id":"1033763304","month":"OCTOBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":60,"gross_sales_usd":67.2,"royalty_rate":0.45,"royalty_amount_usd":27.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":15.0,"overpaid":12.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2024","id":"1033763305","month":"OCTOBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":255,"gross_sales_usd":285.6,"royalty_rate":0.45,"royalty_amount_usd":114.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":63.75,"overpaid":51.0,"leaked":true,"region":"Asia","country":"Hong Kong"},{"quarter":"Q4 2024","id":"1033763306","month":"OCTOBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":100,"gross_sales_usd":112.0,"royalty_rate":0.45,"royalty_amount_usd":45.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":25.0,"overpaid":20.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q4 2024","id":"1033763307","month":"NOVEMBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":320,"gross_sales_usd":358.4,"royalty_rate":0.45,"royalty_amount_usd":144.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":80.0,"overpaid":64.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2024","id":"1033763308","month":"NOVEMBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":22,"gross_sales_usd":264.0,"royalty_rate":0.45,"royalty_amount_usd":9.9,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":5.5,"overpaid":4.4,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q4 2024","id":"1033763309","month":"DECEMBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":260,"gross_sales_usd":291.2,"royalty_rate":0.45,"royalty_amount_usd":117.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":65.0,"overpaid":52.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2024","id":"1033763310","month":"DECEMBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":25,"gross_sales_usd":28.0,"royalty_rate":0.45,"royalty_amount_usd":11.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":6.25,"overpaid":5.0,"leaked":true,"region":"Asia","country":"Hong Kong"},{"quarter":"Q2 2025","id":"1059153428","month":"APRIL","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":454789,"gross_sales_usd":509363.68,"royalty_rate":0.25,"royalty_amount_usd":113697.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":113697.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153429","month":"APRIL","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":71,"gross_sales_usd":79.52,"royalty_rate":0.25,"royalty_amount_usd":17.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":17.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Hong Kong"},{"quarter":"Q2 2025","id":"1059153430","month":"APRIL","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":128,"gross_sales_usd":143.36,"royalty_rate":0.25,"royalty_amount_usd":32.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":32.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153431","month":"MAY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":737103,"gross_sales_usd":825555.36,"royalty_rate":0.25,"royalty_amount_usd":184275.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":184275.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153432","month":"MAY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Hong Kong","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":16,"gross_sales_usd":17.92,"royalty_rate":0.25,"royalty_amount_usd":4.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":4.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Hong Kong"},{"quarter":"Q2 2025","id":"1059153433","month":"MAY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":600,"gross_sales_usd":672.0,"royalty_rate":0.25,"royalty_amount_usd":150.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":150.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q2 2025","id":"1059153434","month":"MAY","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":33297,"gross_sales_usd":37292.64,"royalty_rate":0.25,"royalty_amount_usd":8324.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":8324.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153435","month":"JUNE","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":382515,"gross_sales_usd":428416.8,"royalty_rate":0.25,"royalty_amount_usd":95628.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":95628.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153436","month":"JUNE","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":221350,"gross_sales_usd":247912.0,"royalty_rate":0.25,"royalty_amount_usd":55337.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":55337.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q2 2025","id":"1059153437","month":"JUNE","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":105199,"gross_sales_usd":117822.88,"royalty_rate":0.25,"royalty_amount_usd":26299.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":26299.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q1 2024","id":"1001501157","month":"JANUARY","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":120489,"gross_sales_usd":134947.68,"royalty_rate":0.45,"royalty_amount_usd":54220.05,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":30122.25,"overpaid":24097.8,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2024","id":"1001501158","month":"JANUARY","year":"2024","product_ref":"E090976","description":"80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":2.7,"units":60,"gross_sales_usd":162.0,"royalty_rate":0.45,"royalty_amount_usd":27.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":27.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q1 2024","id":"1001501159","month":"FEBRUARY","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":48966,"gross_sales_usd":54841.92,"royalty_rate":0.45,"royalty_amount_usd":22034.7,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":12241.5,"overpaid":9793.2,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2024","id":"1001501160","month":"MARCH","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":50,"gross_sales_usd":56.0,"royalty_rate":0.45,"royalty_amount_usd":22.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":12.5,"overpaid":10.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q1 2024","id":"1001501161","month":"MARCH","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":9523,"gross_sales_usd":10665.76,"royalty_rate":0.45,"royalty_amount_usd":4285.35,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2380.75,"overpaid":1904.6,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q1 2023","id":"710190397","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"North America > United States","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":3000,"gross_sales_usd":8100.0,"royalty_rate":0.45,"royalty_amount_usd":1350.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":1350.0,"overpaid":0.0,"leaked":false,"region":"North America","country":"United States"},{"quarter":"Q1 2023","id":"710190398","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Europe > Ireland","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":3000,"gross_sales_usd":8100.0,"royalty_rate":0.45,"royalty_amount_usd":1350.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":1350.0,"overpaid":0.0,"leaked":false,"region":"Europe","country":"Ireland"},{"quarter":"Q1 2023","id":"710190399","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":2000,"gross_sales_usd":5400.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190400","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":1.702,"units":20000,"gross_sales_usd":34040.0,"royalty_rate":0.45,"royalty_amount_usd":9000.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":9000.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190401","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":5000,"gross_sales_usd":13500.0,"royalty_rate":0.45,"royalty_amount_usd":2250.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":2250.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190402","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Europe > Ireland","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":10000,"gross_sales_usd":27000.0,"royalty_rate":0.45,"royalty_amount_usd":4500.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":4500.0,"overpaid":0.0,"leaked":false,"region":"Europe","country":"Ireland"},{"quarter":"Q1 2023","id":"710190403","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Brazil","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":2100,"gross_sales_usd":5670.0,"royalty_rate":0.45,"royalty_amount_usd":945.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":945.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Brazil"},{"quarter":"Q1 2023","id":"710190404","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Europe > United Kingdom","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":2500,"gross_sales_usd":6750.0,"royalty_rate":0.45,"royalty_amount_usd":1125.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":1125.0,"overpaid":0.0,"leaked":false,"region":"Europe","country":"United Kingdom"},{"quarter":"Q1 2023","id":"710190405","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":1000,"gross_sales_usd":2700.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190406","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":300,"gross_sales_usd":810.0,"royalty_rate":0.45,"royalty_amount_usd":135.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":135.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190407","month":"JANUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":1.702,"units":61800,"gross_sales_usd":105183.6,"royalty_rate":0.45,"royalty_amount_usd":27810.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":27810.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190408","month":"FEBRUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Asia > Hong Kong","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":60,"gross_sales_usd":162.0,"royalty_rate":0.45,"royalty_amount_usd":27.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":27.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Hong Kong"},{"quarter":"Q1 2023","id":"710190409","month":"FEBRUARY","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":300,"gross_sales_usd":810.0,"royalty_rate":0.45,"royalty_amount_usd":135.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":135.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q1 2023","id":"710190410","month":"MARCH","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"North America > United States","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup > FIFA Club World Cup","unit_price_usd":2.7,"units":1000,"gross_sales_usd":2700.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"rate_type":"Net Wholesale Price","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false,"region":"North America","country":"United States"},{"quarter":"Q4 2025","id":"1083308969","month":"OCTOBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":42384,"gross_sales_usd":47470.08,"royalty_rate":0.25,"royalty_amount_usd":10596.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":10596.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308970","month":"OCTOBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":8,"gross_sales_usd":8.96,"royalty_rate":0.25,"royalty_amount_usd":2.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2025","id":"1083308971","month":"OCTOBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":43656,"gross_sales_usd":48894.72,"royalty_rate":0.25,"royalty_amount_usd":10914.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":10914.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308972","month":"OCTOBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":8,"gross_sales_usd":8.96,"royalty_rate":0.25,"royalty_amount_usd":2.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2025","id":"1083308973","month":"NOVEMBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":74654,"gross_sales_usd":83612.48,"royalty_rate":0.25,"royalty_amount_usd":18663.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":18663.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308974","month":"NOVEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":11440,"gross_sales_usd":12812.8,"royalty_rate":0.25,"royalty_amount_usd":2860.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2860.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308975","month":"NOVEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":1130,"gross_sales_usd":1265.6,"royalty_rate":0.25,"royalty_amount_usd":282.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":282.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2025","id":"1083308976","month":"DECEMBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":33673,"gross_sales_usd":37713.76,"royalty_rate":0.25,"royalty_amount_usd":8418.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":8418.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308977","month":"DECEMBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":6873,"gross_sales_usd":7697.76,"royalty_rate":0.25,"royalty_amount_usd":1718.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1718.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2025","id":"1083308978","month":"DECEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":8990,"gross_sales_usd":10068.8,"royalty_rate":0.25,"royalty_amount_usd":2247.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2247.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2025","id":"1083308979","month":"DECEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":400,"gross_sales_usd":448.0,"royalty_rate":0.25,"royalty_amount_usd":100.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":100.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2025","id":"1083308980","month":"DECEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"South America > Argentina","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":25000,"gross_sales_usd":28000.0,"royalty_rate":0.25,"royalty_amount_usd":6250.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":6250.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q3 2025","id":"1069681552","month":"JULY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":4936,"gross_sales_usd":5528.32,"royalty_rate":0.25,"royalty_amount_usd":1234.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1234.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681553","month":"JULY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Vietnam","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":17491,"gross_sales_usd":19589.92,"royalty_rate":0.25,"royalty_amount_usd":4372.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":4372.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Vietnam"},{"quarter":"Q3 2025","id":"1069681554","month":"JULY","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":53306,"gross_sales_usd":59702.72,"royalty_rate":0.25,"royalty_amount_usd":13326.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":13326.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q3 2025","id":"1069681555","month":"JULY","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":306165,"gross_sales_usd":342904.8,"royalty_rate":0.25,"royalty_amount_usd":76541.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":76541.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681556","month":"JULY","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":58322,"gross_sales_usd":65320.64,"royalty_rate":0.25,"royalty_amount_usd":14580.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":14580.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q3 2025","id":"1069681557","month":"AUGUST","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":79935,"gross_sales_usd":89527.2,"royalty_rate":0.25,"royalty_amount_usd":19983.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":19983.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681558","month":"AUGUST","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Vietnam","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":379,"gross_sales_usd":424.48,"royalty_rate":0.25,"royalty_amount_usd":94.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":94.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Vietnam"},{"quarter":"Q3 2025","id":"1069681559","month":"AUGUST","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":2818,"gross_sales_usd":3156.16,"royalty_rate":0.25,"royalty_amount_usd":704.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":704.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q3 2025","id":"1069681560","month":"AUGUST","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":68005,"gross_sales_usd":76165.6,"royalty_rate":0.25,"royalty_amount_usd":17001.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":17001.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681561","month":"AUGUST","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Vietnam","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":204,"gross_sales_usd":228.48,"royalty_rate":0.25,"royalty_amount_usd":51.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":51.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Vietnam"},{"quarter":"Q3 2025","id":"1069681562","month":"AUGUST","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":586,"gross_sales_usd":656.32,"royalty_rate":0.25,"royalty_amount_usd":146.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":146.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q3 2025","id":"1069681563","month":"SEPTEMBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":13833,"gross_sales_usd":15492.96,"royalty_rate":0.25,"royalty_amount_usd":3458.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":3458.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681564","month":"SEPTEMBER","year":"2025","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":1400,"gross_sales_usd":1568.0,"royalty_rate":0.25,"royalty_amount_usd":350.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":350.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q3 2025","id":"1069681565","month":"SEPTEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":38197,"gross_sales_usd":42780.64,"royalty_rate":0.25,"royalty_amount_usd":9549.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":9549.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2025","id":"1069681566","month":"SEPTEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > Vietnam","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":167,"gross_sales_usd":187.04,"royalty_rate":0.25,"royalty_amount_usd":41.75,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":41.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Vietnam"},{"quarter":"Q3 2025","id":"1069681567","month":"SEPTEMBER","year":"2025","product_ref":"E130415","description":"80038305 PATCH FIFA OP1 5.8X7.9CM WHITE/GOLD ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":2640,"gross_sales_usd":2956.8,"royalty_rate":0.25,"royalty_amount_usd":660.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":660.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"quarter":"Q4 2023","id":"974044427","month":"OCTOBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":164580,"gross_sales_usd":184329.6,"royalty_rate":0.45,"royalty_amount_usd":74061.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":41145.0,"overpaid":32916.0,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2023","id":"974044428","month":"OCTOBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":11120,"gross_sales_usd":12454.4,"royalty_rate":0.45,"royalty_amount_usd":5004.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2780.0,"overpaid":2224.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q4 2023","id":"974044429","month":"NOVEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":210138,"gross_sales_usd":235354.56,"royalty_rate":0.45,"royalty_amount_usd":94562.1,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":52534.5,"overpaid":42027.6,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2023","id":"974044430","month":"NOVEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":9300,"gross_sales_usd":10416.0,"royalty_rate":0.45,"royalty_amount_usd":4185.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":2325.0,"overpaid":1860.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q4 2023","id":"974044431","month":"DECEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":7716,"gross_sales_usd":8641.92,"royalty_rate":0.45,"royalty_amount_usd":3472.2,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":1929.0,"overpaid":1543.2,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q4 2023","id":"974044432","month":"DECEMBER","year":"2023","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > China","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":30,"gross_sales_usd":33.6,"royalty_rate":0.45,"royalty_amount_usd":13.5,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":7.5,"overpaid":6.0,"leaked":true,"region":"Asia","country":"China"},{"quarter":"Q2 2023","id":"951486078","month":"Q2","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Brazil","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":2.7,"units":500,"gross_sales_usd":1350.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Brazil"},{"quarter":"Q2 2023","id":"951486079","month":"Q2","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Asia > Hong Kong","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":2.7,"units":60,"gross_sales_usd":162.0,"royalty_rate":0.45,"royalty_amount_usd":27.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":27.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Hong Kong"},{"quarter":"Q2 2023","id":"951486080","month":"Q2","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"South America > Argentina","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.702,"units":20000,"gross_sales_usd":34040.0,"royalty_rate":0.45,"royalty_amount_usd":9000.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":9000.0,"overpaid":0.0,"leaked":false,"region":"South America","country":"Argentina"},{"quarter":"Q2 2023","id":"951486081","month":"Q2","year":"2023","product_ref":"E090976","description":".4 80036447 PATCH FIFA 2022 5,8X7,9CM DOUR/PANT.75","territory":"Asia > Thailand","channel":"B2B","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":100,"gross_sales_usd":112.0,"royalty_rate":0.45,"royalty_amount_usd":45.0,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"TPU","correct_rate":0.45,"correct_royalty":45.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2024","id":"1015441413","month":"JULY","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":601,"gross_sales_usd":673.12,"royalty_rate":0.45,"royalty_amount_usd":270.45,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":150.25,"overpaid":120.2,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2024","id":"1015441414","month":"AUGUST","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":14179,"gross_sales_usd":15880.48,"royalty_rate":0.45,"royalty_amount_usd":6380.55,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":3544.75,"overpaid":2835.8,"leaked":true,"region":"Asia","country":"Thailand"},{"quarter":"Q3 2024","id":"1015441415","month":"SEPTEMBER","year":"2024","product_ref":"E099714","description":"80038305 PATCH FIFA OP1 5.8X7.9CM MULTICOLOR ECOFLEX (S)","territory":"Asia > Thailand","channel":"Kiosk","property_logo":"FIFA World Cup 2022 > Official Emblem","product_hierarchy":"Champions Badge > FIFA World Cup > FIFA World Cup > FIFA World Cup","unit_price_usd":1.12,"units":19565,"gross_sales_usd":21912.8,"royalty_rate":0.45,"royalty_amount_usd":8804.25,"rate_type":"Branded Units Sold","cycle":"FWC22","contract":"99313","material":"Ecoflex","correct_rate":0.25,"correct_royalty":4891.25,"overpaid":3913.0,"leaked":true,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2023","id":"963636875","month":"AUGUST","year":"2023","product_ref":"E101394","description":".4 PATCH FIFA WORLD CUP 2023 5.7X7.8CM GOLD/ WHITE TPU","territory":"Europe > Ireland","channel":"Kiosk","unit_price_usd":2.7,"units":500,"gross_sales_usd":1350.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false,"region":"Europe","country":"Ireland"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2023","id":"963636876","month":"AUGUST","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":184,"gross_sales_usd":206.08,"royalty_rate":0.45,"royalty_amount_usd":82.8,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":82.8,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2023","id":"963636877","month":"SEPTEMBER","year":"2023","product_ref":"E101394","description":".4 PATCH FIFA WORLD CUP 2023 5.7X7.8CM GOLD/ WHITE TPU","territory":"Europe > Ireland","channel":"Kiosk","unit_price_usd":2.7,"units":5000,"gross_sales_usd":13500.0,"royalty_rate":0.45,"royalty_amount_usd":2250.0,"material":"TPU","correct_rate":0.45,"correct_royalty":2250.0,"overpaid":0.0,"leaked":false,"region":"Europe","country":"Ireland"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2023","id":"963636878","month":"SEPTEMBER","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":139,"gross_sales_usd":155.68,"royalty_rate":0.45,"royalty_amount_usd":62.55,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":62.55,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2023","id":"974044287","month":"OCTOBER","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":12200,"gross_sales_usd":13664.0,"royalty_rate":0.45,"royalty_amount_usd":5490.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":5490.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2023","id":"974044288","month":"OCTOBER","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > China","channel":"Kiosk","unit_price_usd":1.12,"units":20,"gross_sales_usd":22.4,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"China"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2023","id":"974044289","month":"NOVEMBER","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":2323,"gross_sales_usd":2601.76,"royalty_rate":0.45,"royalty_amount_usd":1045.35,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":1045.35,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2023","id":"974044290","month":"DECEMBER","year":"2023","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":1167,"gross_sales_usd":1307.04,"royalty_rate":0.45,"royalty_amount_usd":525.15,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":525.15,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2024","id":"1001501153","month":"JANUARY","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":20,"gross_sales_usd":22.4,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2024","id":"1001501154","month":"FEBRUARY","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":517,"gross_sales_usd":579.04,"royalty_rate":0.45,"royalty_amount_usd":232.65,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":232.65,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2024","id":"1001501155","month":"MARCH","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":20,"gross_sales_usd":22.4,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2024","id":"1001501162","month":"APRIL","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":363,"gross_sales_usd":406.56,"royalty_rate":0.45,"royalty_amount_usd":163.35,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":163.35,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2024","id":"1001501163","month":"MAY","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":75,"gross_sales_usd":84.0,"royalty_rate":0.45,"royalty_amount_usd":33.75,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":33.75,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2024","id":"1001501164","month":"JUNE","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":8562,"gross_sales_usd":9589.44,"royalty_rate":0.45,"royalty_amount_usd":3852.9,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":3852.9,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2024","id":"1015441410","month":"JULY","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":19289,"gross_sales_usd":21603.68,"royalty_rate":0.45,"royalty_amount_usd":8680.05,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":8680.05,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2024","id":"1015441411","month":"AUGUST","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":20050,"gross_sales_usd":22456.0,"royalty_rate":0.45,"royalty_amount_usd":9022.5,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9022.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2024","id":"1015441412","month":"SEPTEMBER","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":11337,"gross_sales_usd":12697.44,"royalty_rate":0.45,"royalty_amount_usd":5101.65,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":5101.65,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2024","id":"1033763311","month":"OCTOBER","year":"2024","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":3597,"gross_sales_usd":4028.64,"royalty_rate":0.45,"royalty_amount_usd":1618.65,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":1618.65,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2025","id":"1046902103","month":"FEBRUARY","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":20,"gross_sales_usd":22.4,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2025","id":"1046902104","month":"MARCH","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":1.12,"units":20,"gross_sales_usd":22.4,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154452","month":"APRIL","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":20,"gross_sales_usd":19.6,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154453","month":"APRIL","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":1731,"gross_sales_usd":1696.38,"royalty_rate":0.45,"royalty_amount_usd":778.95,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":778.95,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154454","month":"MAY","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":10,"gross_sales_usd":9.8,"royalty_rate":0.45,"royalty_amount_usd":4.5,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":4.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154455","month":"MAY","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":326,"gross_sales_usd":319.48,"royalty_rate":0.45,"royalty_amount_usd":146.7,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":146.7,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154456","month":"JUNE","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":849,"gross_sales_usd":832.02,"royalty_rate":0.45,"royalty_amount_usd":382.05,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":382.05,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q2 2025","id":"1059154457","month":"JUNE","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":20,"gross_sales_usd":19.6,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2025","id":"1070703441","month":"JULY","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":60,"gross_sales_usd":58.8,"royalty_rate":0.45,"royalty_amount_usd":27.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":27.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2025","id":"1070703442","month":"JULY","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":6,"gross_sales_usd":5.88,"royalty_rate":0.45,"royalty_amount_usd":2.7,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":2.7,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q3 2025","id":"1070703443","month":"AUGUST","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":10,"gross_sales_usd":9.8,"royalty_rate":0.45,"royalty_amount_usd":4.5,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":4.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2025","id":"1083302433","month":"NOVEMBER","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":85,"gross_sales_usd":83.3,"royalty_rate":0.45,"royalty_amount_usd":38.25,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":38.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2025","id":"1083302434","month":"NOVEMBER","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":64,"gross_sales_usd":62.72,"royalty_rate":0.45,"royalty_amount_usd":28.8,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":28.8,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q4 2025","id":"1083302435","month":"DECEMBER","year":"2025","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":20,"gross_sales_usd":19.6,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2026","id":"1104425606","month":"JANUARY","year":"2026","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":150,"gross_sales_usd":147.0,"royalty_rate":0.45,"royalty_amount_usd":67.5,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":67.5,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2026","id":"1104425607","month":"FEBRUARY","year":"2026","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":25,"gross_sales_usd":24.5,"royalty_rate":0.45,"royalty_amount_usd":11.25,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":11.25,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2026","id":"1104425608","month":"FEBRUARY","year":"2026","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Cambodia","channel":"Kiosk","unit_price_usd":0.98,"units":1,"gross_sales_usd":0.98,"royalty_rate":0.45,"royalty_amount_usd":0.45,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":0.45,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Cambodia"},{"cycle":"FWWC23","contract":"105215","quarter":"Q1 2026","id":"1104425609","month":"MARCH","year":"2026","product_ref":"E105470","description":"80038858 PATCH FIFA WOMEN WINNER 5.7X7.8CM MULTICOLOR ECOFLEX","territory":"Asia > Thailand","channel":"Kiosk","unit_price_usd":0.98,"units":20,"gross_sales_usd":19.6,"royalty_rate":0.45,"royalty_amount_usd":9.0,"material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.0,"overpaid":0.0,"leaked":false,"region":"Asia","country":"Thailand"},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885182","month":"APRIL","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":375,"gross_sales_usd":1380.0,"royalty_rate":0.45,"royalty_amount_usd":168.75,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":168.75,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885183","month":"APRIL","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Singapore > Singapore","channel":"Distributors","unit_price_usd":3.68,"units":1000,"gross_sales_usd":3680.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"country":"Singapore","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885184","month":"APRIL","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":3.68,"units":1400,"gross_sales_usd":5152.0,"royalty_rate":0.45,"royalty_amount_usd":630.0,"country":"Hong Kong","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":630.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885185","month":"APRIL","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Japan > Japan","channel":"Distributors","unit_price_usd":3.68,"units":3770,"gross_sales_usd":13873.6,"royalty_rate":0.45,"royalty_amount_usd":1696.5,"country":"Japan","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":1696.5,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885186","month":"APRIL","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"North America > USA > USA","channel":"Distributors","unit_price_usd":3.68,"units":14000,"gross_sales_usd":51520.0,"royalty_rate":0.45,"royalty_amount_usd":6300.0,"country":"USA","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":6300.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885187","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":36591,"gross_sales_usd":134654.88,"royalty_rate":0.45,"royalty_amount_usd":16465.95,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":16465.95,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885188","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.68,"units":30000,"gross_sales_usd":110400.0,"royalty_rate":0.45,"royalty_amount_usd":13500.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":13500.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885189","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > South Korea > South Korea","channel":"Distributors","unit_price_usd":3.68,"units":1500,"gross_sales_usd":5520.0,"royalty_rate":0.45,"royalty_amount_usd":675.0,"country":"South Korea","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":675.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885190","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Middle East > Saudi Arabia > Saudi Arabia","channel":"Distributors","unit_price_usd":3.68,"units":10000,"gross_sales_usd":36800.0,"royalty_rate":0.45,"royalty_amount_usd":4500.0,"country":"Saudi Arabia","region":"Middle East","material":"TPU","correct_rate":0.45,"correct_royalty":4500.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885191","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"EEA > Austria > Austria","channel":"Distributors","unit_price_usd":3.68,"units":200,"gross_sales_usd":736.0,"royalty_rate":0.45,"royalty_amount_usd":90.0,"country":"Austria","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":90.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885192","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"North America > Mexico > Mexico","channel":"Distributors","unit_price_usd":3.68,"units":2000,"gross_sales_usd":7360.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"Mexico","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885193","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"EEA > Spain > Spain","channel":"Distributors","unit_price_usd":3.68,"units":500,"gross_sales_usd":1840.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"country":"Spain","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885194","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Middle East > United Arab Emirates > United Arab Emirates","channel":"Distributors","unit_price_usd":3.68,"units":500,"gross_sales_usd":1840.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"country":"United Arab Emirates","region":"Middle East","material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885195","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"EEA > Portugal > Portugal","channel":"Distributors","unit_price_usd":3.68,"units":2000,"gross_sales_usd":7360.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"Portugal","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885196","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":3.68,"units":40,"gross_sales_usd":147.2,"royalty_rate":0.45,"royalty_amount_usd":18.0,"country":"Hong Kong","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":18.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885197","month":"MAY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Colombia > Colombia","channel":"Distributors","unit_price_usd":3.68,"units":800,"gross_sales_usd":2944.0,"royalty_rate":0.45,"royalty_amount_usd":360.0,"country":"Colombia","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":360.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885198","month":"MAY","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.68,"units":7000,"gross_sales_usd":25760.0,"royalty_rate":0.45,"royalty_amount_usd":3150.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":3150.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885199","month":"MAY","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"EEA > Portugal > Portugal","channel":"Distributors","unit_price_usd":3.68,"units":300,"gross_sales_usd":1104.0,"royalty_rate":0.45,"royalty_amount_usd":135.0,"country":"Portugal","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":135.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885200","month":"MAY","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"South America > Colombia > Colombia","channel":"Distributors","unit_price_usd":3.68,"units":200,"gross_sales_usd":736.0,"royalty_rate":0.45,"royalty_amount_usd":90.0,"country":"Colombia","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":90.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885201","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":5894,"gross_sales_usd":21689.92,"royalty_rate":0.45,"royalty_amount_usd":2652.3,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":2652.3,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885202","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.68,"units":5000,"gross_sales_usd":18400.0,"royalty_rate":0.45,"royalty_amount_usd":2250.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2250.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885203","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"North America > USA > USA","channel":"Distributors","unit_price_usd":3.68,"units":8910,"gross_sales_usd":32788.8,"royalty_rate":0.45,"royalty_amount_usd":4009.5,"country":"USA","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":4009.5,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885204","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"North America > Mexico > Mexico","channel":"Distributors","unit_price_usd":3.68,"units":300,"gross_sales_usd":1104.0,"royalty_rate":0.45,"royalty_amount_usd":135.0,"country":"Mexico","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":135.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885205","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Mainland China > Mainland China","channel":"Distributors","unit_price_usd":3.68,"units":400,"gross_sales_usd":1472.0,"royalty_rate":0.45,"royalty_amount_usd":180.0,"country":"China","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":180.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885206","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":3.68,"units":750,"gross_sales_usd":2760.0,"royalty_rate":0.45,"royalty_amount_usd":337.5,"country":"Hong Kong","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":337.5,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885207","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Argentina > Argentina","channel":"Distributors","unit_price_usd":3.68,"units":6000,"gross_sales_usd":22080.0,"royalty_rate":0.45,"royalty_amount_usd":2700.0,"country":"Argentina","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":2700.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885208","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Asia > South Korea > South Korea","channel":"Distributors","unit_price_usd":3.68,"units":500,"gross_sales_usd":1840.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"country":"South Korea","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885209","month":"JUNE","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"Europe non EEA > Switzerland > Switzerland","channel":"Distributors","unit_price_usd":3.68,"units":200,"gross_sales_usd":736.0,"royalty_rate":0.45,"royalty_amount_usd":90.0,"country":"Switzerland","region":"Europe non EEA","material":"TPU","correct_rate":0.45,"correct_royalty":90.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885210","month":"JUNE","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.68,"units":2000,"gross_sales_usd":7360.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885211","month":"JUNE","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"North America > USA > USA","channel":"Distributors","unit_price_usd":3.68,"units":1355,"gross_sales_usd":4986.4,"royalty_rate":0.45,"royalty_amount_usd":609.75,"country":"USA","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":609.75,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q2 2025","id":"1062885212","month":"JUNE","year":"2025","product_ref":"E143425","description":"PATCH FWC 26 COMPETITION JUNIOR SIZE 6CM GOLD/WHITE TPU (S)","territory":"South America > Argentina > Argentina","channel":"Distributors","unit_price_usd":3.68,"units":1000,"gross_sales_usd":3680.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"country":"Argentina","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762815","month":"JULY","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":2400,"gross_sales_usd":8832.0,"royalty_rate":0.45,"royalty_amount_usd":1080.0,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":1080.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762816","month":"JULY","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":4.23,"units":40000,"gross_sales_usd":169200.0,"royalty_rate":0.45,"royalty_amount_usd":18000.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":18000.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762817","month":"JULY","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"North America > USA > USA","channel":"Distributors","unit_price_usd":4.23,"units":1000,"gross_sales_usd":4230.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"country":"USA","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762818","month":"JULY","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Asia > Mainland China > Mainland China","channel":"Distributors","unit_price_usd":4.23,"units":2000,"gross_sales_usd":8460.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"China","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762819","month":"JULY","year":"2025","product_ref":"E145880","description":"PATCH CWC 25 CHAMPIONS 6X6CM DOURADO/BRANCO TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.66,"units":6000,"gross_sales_usd":21960.0,"royalty_rate":0.45,"royalty_amount_usd":2700.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2700.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762820","month":"JULY","year":"2025","product_ref":"E145880","description":"PATCH CWC 25 CHAMPIONS 6X6CM DOURADO/BRANCO TPU (S)","territory":"North America > USA > USA","channel":"Distributors","unit_price_usd":3.66,"units":250,"gross_sales_usd":915.0,"royalty_rate":0.45,"royalty_amount_usd":112.5,"country":"USA","region":"North America","material":"TPU","correct_rate":0.45,"correct_royalty":112.5,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762821","month":"AUGUST","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":1222,"gross_sales_usd":4496.96,"royalty_rate":0.45,"royalty_amount_usd":549.9,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":549.9,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762822","month":"AUGUST","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.68,"units":1000,"gross_sales_usd":3680.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762823","month":"AUGUST","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":4.23,"units":5000,"gross_sales_usd":21150.0,"royalty_rate":0.45,"royalty_amount_usd":2250.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2250.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762824","month":"AUGUST","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Europe non EEA > United Kingdom > United Kingdom","channel":"Distributors","unit_price_usd":4.23,"units":25000,"gross_sales_usd":105750.0,"royalty_rate":0.45,"royalty_amount_usd":11250.0,"country":"United Kingdom","region":"Europe non EEA","material":"TPU","correct_rate":0.45,"correct_royalty":11250.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762825","month":"AUGUST","year":"2025","product_ref":"E145880","description":"PATCH CWC 25 CHAMPIONS 6X6CM DOURADO/BRANCO TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.66,"units":1700,"gross_sales_usd":6222.0,"royalty_rate":0.45,"royalty_amount_usd":765.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":765.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762826","month":"SEPTEMBER","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":540,"gross_sales_usd":1987.2,"royalty_rate":0.45,"royalty_amount_usd":243.0,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":243.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762827","month":"SEPTEMBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":4.23,"units":5000,"gross_sales_usd":21150.0,"royalty_rate":0.45,"royalty_amount_usd":2250.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2250.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762828","month":"SEPTEMBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"EEA > Denmark > Denmark","channel":"Distributors","unit_price_usd":4.23,"units":100,"gross_sales_usd":423.0,"royalty_rate":0.45,"royalty_amount_usd":45.0,"country":"Denmark","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":45.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q3 2025","id":"1074762829","month":"SEPTEMBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Asia > Malaysia > Malaysia","channel":"Distributors","unit_price_usd":4.23,"units":40,"gross_sales_usd":169.2,"royalty_rate":0.45,"royalty_amount_usd":18.0,"country":"Malaysia","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":18.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302196","month":"OCTOBER","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":540,"gross_sales_usd":1987.2,"royalty_rate":0.45,"royalty_amount_usd":243.0,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":243.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302197","month":"OCTOBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":4.23,"units":6000,"gross_sales_usd":25380.0,"royalty_rate":0.45,"royalty_amount_usd":2700.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2700.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302198","month":"OCTOBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Asia > Mainland China > Mainland China","channel":"Distributors","unit_price_usd":4.23,"units":840,"gross_sales_usd":3553.2,"royalty_rate":0.45,"royalty_amount_usd":378.0,"country":"China","region":"Asia","material":"TPU","correct_rate":0.45,"correct_royalty":378.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302199","month":"OCTOBER","year":"2025","product_ref":"E145880","description":"PATCH CWC 25 CHAMPIONS 6X6CM DOURADO/BRANCO TPU (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":3.66,"units":2500,"gross_sales_usd":9150.0,"royalty_rate":0.45,"royalty_amount_usd":1125.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":1125.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302200","month":"NOVEMBER","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":540,"gross_sales_usd":1982.2,"royalty_rate":0.45,"royalty_amount_usd":243.0,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":243.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302201","month":"NOVEMBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Europe non EEA > United Kingdom > United Kingdom","channel":"Distributors","unit_price_usd":4.23,"units":14000,"gross_sales_usd":59220.0,"royalty_rate":0.45,"royalty_amount_usd":6300.0,"country":"United Kingdom","region":"Europe non EEA","material":"TPU","correct_rate":0.45,"correct_royalty":6300.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302202","month":"DECEMBER","year":"2025","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/ WHITE TPU (S)","territory":"South America > Brazil > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":540,"gross_sales_usd":1987.2,"royalty_rate":0.45,"royalty_amount_usd":243.0,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":243.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q4 2025","id":"1083302203","month":"DECEMBER","year":"2025","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Europe non EEA > United Kingdom > United Kingdom","channel":"Distributors","unit_price_usd":4.23,"units":15000,"gross_sales_usd":63450.0,"royalty_rate":0.45,"royalty_amount_usd":6750.0,"country":"United Kingdom","region":"Europe non EEA","material":"TPU","correct_rate":0.45,"correct_royalty":6750.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885169","month":"APRIL","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Spain > Spain","channel":"Distributors","unit_price_usd":2.1,"units":3000,"gross_sales_usd":6300.0,"royalty_rate":0.45,"royalty_amount_usd":1350.0,"country":"Spain","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":1350.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885170","month":"MAY","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":56951,"gross_sales_usd":119597.1,"royalty_rate":0.45,"royalty_amount_usd":25627.95,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":25627.95,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885171","month":"MAY","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":2.1,"units":40,"gross_sales_usd":84.0,"royalty_rate":0.45,"royalty_amount_usd":18.0,"country":"Hong Kong","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":18.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885172","month":"MAY","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"South America > Colombia > Colombia","channel":"Distributors","unit_price_usd":2.1,"units":1300,"gross_sales_usd":2730.0,"royalty_rate":0.45,"royalty_amount_usd":585.0,"country":"Colombia","region":"South America","material":"Ecoflex","correct_rate":0.45,"correct_royalty":585.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885173","month":"MAY","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":1.68,"units":24000,"gross_sales_usd":40320.0,"royalty_rate":0.45,"royalty_amount_usd":10800.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":10800.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885174","month":"MAY","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"North America > Mexico > Mexico","channel":"Distributors","unit_price_usd":1.68,"units":700,"gross_sales_usd":1176.0,"royalty_rate":0.45,"royalty_amount_usd":315.0,"country":"Mexico","region":"North America","material":"Ecoflex","correct_rate":0.45,"correct_royalty":315.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885175","month":"JUNE","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":13049,"gross_sales_usd":27402.9,"royalty_rate":0.45,"royalty_amount_usd":5872.05,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":5872.05,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885176","month":"JUNE","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":2.1,"units":2050,"gross_sales_usd":4305.0,"royalty_rate":0.45,"royalty_amount_usd":922.5,"country":"Hong Kong","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":922.5,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885177","month":"JUNE","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Mainland China > Mainland China","channel":"Distributors","unit_price_usd":2.1,"units":1000,"gross_sales_usd":2100.0,"royalty_rate":0.45,"royalty_amount_usd":450.0,"country":"China","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":450.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885178","month":"JUNE","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"North America > Mexico > Mexico","channel":"Distributors","unit_price_usd":2.1,"units":2500,"gross_sales_usd":5250.0,"royalty_rate":0.45,"royalty_amount_usd":1125.0,"country":"Mexico","region":"North America","material":"Ecoflex","correct_rate":0.45,"correct_royalty":1125.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885179","month":"JUNE","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Central America > Guatamala > Guatamala","channel":"Distributors","unit_price_usd":2.1,"units":270,"gross_sales_usd":567.0,"royalty_rate":0.45,"royalty_amount_usd":121.5,"country":"Guatemala","region":"Central America","material":"Ecoflex","correct_rate":0.45,"correct_royalty":121.5,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885180","month":"JUNE","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":1.68,"units":2000,"gross_sales_usd":3360.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q2 2025","id":"1062885181","month":"JUNE","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"North America > Mexico > Mexico","channel":"Distributors","unit_price_usd":1.68,"units":500,"gross_sales_usd":840.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"country":"Mexico","region":"North America","material":"Ecoflex","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796704","month":"JULY","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":39600,"gross_sales_usd":83160.0,"royalty_rate":0.45,"royalty_amount_usd":17820.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":17820.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796705","month":"JULY","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Hong Kong > Hong Kong","channel":"Distributors","unit_price_usd":2.1,"units":200,"gross_sales_usd":420.0,"royalty_rate":0.45,"royalty_amount_usd":90.0,"country":"Hong Kong","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":90.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796706","month":"AUGUST","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":45000,"gross_sales_usd":94500.0,"royalty_rate":0.45,"royalty_amount_usd":20250.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":20250.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796707","month":"AUGUST","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":1.68,"units":15000,"gross_sales_usd":25200.0,"royalty_rate":0.45,"royalty_amount_usd":6750.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":6750.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796708","month":"SEPTEMBER","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":35000,"gross_sales_usd":73500.0,"royalty_rate":0.45,"royalty_amount_usd":15750.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":15750.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796709","month":"SEPTEMBER","year":"2025","product_ref":"E143929","description":"PATCH FIFA FIC24 OP.1 5,0X6,3CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":1.68,"units":15000,"gross_sales_usd":25200.0,"royalty_rate":0.45,"royalty_amount_usd":6750.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":6750.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q3 2025","id":"1070796710","month":"SEPTEMBER","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Malaysia > Malaysia","channel":"Distributors","unit_price_usd":2.1,"units":100,"gross_sales_usd":210.0,"royalty_rate":0.45,"royalty_amount_usd":45.0,"country":"Malaysia","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":45.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q4 2025","id":"1083291274","month":"OCTOBER","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"Asia > Mainland China > Mainland China","channel":"Distributors","unit_price_usd":2.1,"units":340,"gross_sales_usd":714.0,"royalty_rate":0.45,"royalty_amount_usd":153.0,"country":"China","region":"Asia","material":"Ecoflex","correct_rate":0.45,"correct_royalty":153.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q4 2025","id":"1083291275","month":"NOVEMBER","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":2000,"gross_sales_usd":4200.0,"royalty_rate":0.45,"royalty_amount_usd":900.0,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":900.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC24","contract":"40005352","quarter":"Q4 2025","id":"1083291276","month":"DECEMBER","year":"2025","product_ref":"E137264","description":"PATCH FIFA FIC24 OP.1 6,2X7,9CM MULTICOLOR ECOFLEX (NI)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.1,"units":22,"gross_sales_usd":46.2,"royalty_rate":0.45,"royalty_amount_usd":9.9,"country":"Ireland","region":"EEA","material":"Ecoflex","correct_rate":0.45,"correct_royalty":9.9,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q4 2025","id":"1083302316","month":"NOVEMBER","year":"2025","product_ref":"E155217","description":"PATCH FIFA FIC25 7,9X6,2CM GOLD/ WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.85,"units":10000,"gross_sales_usd":28500.0,"royalty_rate":0.45,"royalty_amount_usd":4500.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":4500.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q4 2025","id":"1083302317","month":"NOVEMBER","year":"2025","product_ref":"E158955","description":"PATCH FIFA FIC25 6,3X5CM GOLD/WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.28,"units":500,"gross_sales_usd":1140.0,"royalty_rate":0.45,"royalty_amount_usd":225.0,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":225.0,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q4 2025","id":"1083302318","month":"DECEMBER","year":"2025","product_ref":"E155217","description":"PATCH FIFA FIC25 7,9X6,2CM GOLD/ WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.85,"units":20824,"gross_sales_usd":59348.4,"royalty_rate":0.45,"royalty_amount_usd":9370.8,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":9370.8,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q4 2025","id":"1083302319","month":"DECEMBER","year":"2025","product_ref":"E158955","description":"PATCH FIFA FIC25 6,3X5CM GOLD/WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.28,"units":1224,"gross_sales_usd":2790.72,"royalty_rate":0.45,"royalty_amount_usd":550.8,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":550.8,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q1 2026","id":"1104643639","month":"JANUARY","year":"2026","product_ref":"E155217","description":"PATCH FIFA FIC25 7,9X6,2CM GOLD/ WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.85,"units":34267,"gross_sales_usd":97660.95,"royalty_rate":0.45,"royalty_amount_usd":15420.15,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":15420.15,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q1 2026","id":"1104643640","month":"JANUARY","year":"2026","product_ref":"E158955","description":"PATCH FIFA FIC25 6,3X5CM GOLD/WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.28,"units":10656,"gross_sales_usd":24295.68,"royalty_rate":0.45,"royalty_amount_usd":4795.2,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":4795.2,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q1 2026","id":"1104643641","month":"FEBRUARY","year":"2026","product_ref":"E155217","description":"PATCH FIFA FIC25 7,9X6,2CM GOLD/ WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.85,"units":5733,"gross_sales_usd":16339.05,"royalty_rate":0.45,"royalty_amount_usd":2579.85,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":2579.85,"overpaid":0.0,"leaked":false},{"cycle":"FIC25","contract":"40005890","quarter":"Q1 2026","id":"1104643642","month":"FEBRUARY","year":"2026","product_ref":"E158955","description":"PATCH FIFA FIC25 6,3X5CM GOLD/WHITE TPU FS (S)","territory":"EEA > Ireland > Ireland","channel":"Distributors","unit_price_usd":2.28,"units":3344,"gross_sales_usd":7624.32,"royalty_rate":0.45,"royalty_amount_usd":1504.8,"country":"Ireland","region":"EEA","material":"TPU","correct_rate":0.45,"correct_royalty":1504.8,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q1 2026","id":"","month":"JAN","year":"2026","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":345,"gross_sales_usd":1269.6,"royalty_rate":0.45,"royalty_amount_usd":155.25,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":155.25,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q1 2026","id":"","month":"JAN","year":"2026","product_ref":"E142198","description":"PATCH CWC 25 CHAMPIONS 7,5CM DOU/BRA TPU (NI)","territory":"Europe > UK","channel":"Distributors","unit_price_usd":4.23,"units":15500,"gross_sales_usd":65565.0,"royalty_rate":0.45,"royalty_amount_usd":6975.0,"country":"United Kingdom","region":"Europe","material":"TPU","correct_rate":0.45,"correct_royalty":6975.0,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q1 2026","id":"","month":"FEB","year":"2026","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":25,"gross_sales_usd":92.0,"royalty_rate":0.45,"royalty_amount_usd":11.25,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":11.25,"overpaid":0.0,"leaked":false},{"cycle":"FCWC25","contract":"40005390","quarter":"Q1 2026","id":"","month":"MAR","year":"2026","product_ref":"E142562","description":"PATCH CWC 25 COMPETITION 8CM GOLD/WHITE TPU (S)","territory":"South America > Brazil","channel":"Distributors","unit_price_usd":3.68,"units":1,"gross_sales_usd":3.68,"royalty_rate":0.45,"royalty_amount_usd":0.45,"country":"Brazil","region":"South America","material":"TPU","correct_rate":0.45,"correct_royalty":0.45,"overpaid":0.0,"leaked":false}]};

// ================================================================
// PLAYMAKER OFFICIAL LOGO 1 (inline SVG, fill atomized per skill rule)
// ================================================================
const PLAYMAKER_LOGO_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 826.87 180\">\n  <g>\n    <g>\n      <g>\n        <path fill=\"#f9f9f9\" d=\"M240,119.57V30.69c0-.61.5-1.11,1.11-1.11h37.3c2.95,0,5.97.35,9.05,1.05,3.08.7,5.91,2.09,8.5,4.19,2.58,2.09,4.68,5.23,6.28,9.42,1.6,4.18,2.4,9.73,2.4,16.62s-.8,12.48-2.4,16.74c-1.6,4.27-3.67,7.51-6.22,9.73s-5.29,3.69-8.25,4.43c-2.95.74-5.83,1.11-8.62,1.11-1.48,0-3.2-.06-5.17-.18-1.97-.12-3.96-.31-5.97-.55-2.01-.24-3.88-.47-5.6-.68-1.12-.13-2.1-.26-2.93-.37-.67-.09-1.25.43-1.25,1.1v27.39c0,.61-.5,1.11-1.11,1.11h-16c-.61,0-1.11-.5-1.11-1.11ZM258.22,75.37c0,.61.5,1.11,1.11,1.11h16.99c2.13,0,3.96-.51,5.48-1.54,1.52-1.03,2.65-2.67,3.39-4.93.74-2.26,1.11-5.27,1.11-9.05s-.39-6.62-1.17-8.8c-.78-2.17-1.89-3.75-3.33-4.74-1.44-.99-3.14-1.48-5.11-1.48h-17.36c-.61,0-1.11.5-1.11,1.11v28.31Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M329.87,25.39c1.23,0,1.85.62,1.85,1.85v91.47c0,1.35-.62,1.97-1.85,1.97h-14.53c-1.23,0-1.85-.62-1.85-1.97V27.24c0-1.23.62-1.85,1.85-1.85h14.53Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M398.92,72.59v42.33c0,1.96-.49,3.06-2.69,3.79-8.56,1.96-19.33,2.57-27.78,2.57-18.35,0-28.01-1.96-28.26-21.16.24-16.52,8.81-20.07,25.08-20.07h15.54v-4.4c0-5.87-3.67-8.44-11.5-8.44h-22.14c-1.35,0-1.71-.37-1.71-1.84v-10.03c0-1.47.49-1.71,1.71-1.96,7.46-1.47,14.56-1.84,22.14-1.84,24.22,0,29.61,7.83,29.61,21.04ZM366.74,91.8c-6.36,0-8.56,2.08-8.56,7.34,0,5.87,2.69,7.46,10.4,7.46,2.45,0,8.69-.24,12.23-1.22v-13.58h-14.07Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M431.48,148.62l6.51-26.58c.17-.69-.34-1.36-1.05-1.38-3.61-.07-8.25-.44-10.78-1.54-4.94-2.16-7.88-12.38-8.87-16.26l-12.14-47.23c-.18-.7.35-1.39,1.08-1.39h16.74c.52,0,.97.36,1.08.86l10.31,44.05c.41,1.57,1.05,5.17,3.36,5.89.79.25,1.78.36,2.4.48.62.12,1.09.18,1.42.18l11.8-50.61c.12-.5.57-.86,1.08-.86h16.27c.72,0,1.25.67,1.08,1.37l-19.45,82.02c-.02.08-.05.16-.08.23l-5.58,11.51c-.19.38-.57.63-1,.63h-13.1c-.72,0-1.25-.68-1.08-1.38Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M481.02,119.57v-63.89c0-.61.5-1.11,1.11-1.11h13.2c.43,0,.82.25,1.01.64l2.34,4.94c.29.62,1.07.82,1.63.42,2.58-1.81,5.36-3.4,8.35-4.77,3.4-1.56,7.61-2.34,12.62-2.34,4.19,0,7.65.86,10.4,2.59,2.38,1.49,4.25,3.38,5.62,5.67.34.57,1.05.75,1.58.35,1.65-1.22,3.52-2.4,5.6-3.57,2.5-1.39,5.19-2.58,8.06-3.57,2.87-.98,5.7-1.48,8.5-1.48,5.33,0,9.54,1.01,12.62,3.02,3.08,2.01,5.23,4.84,6.46,8.5,1.23,3.65,1.85,7.94,1.85,12.86v41.73c0,.61-.5,1.11-1.11,1.11h-15.99c-.61,0-1.11-.5-1.11-1.11v-40.13c0-2.13-.39-3.9-1.17-5.29-.78-1.4-1.87-2.46-3.26-3.2s-3.08-1.11-5.05-1.11c-2.46,0-4.95.51-7.45,1.54-2.51,1.03-4.74,2.24-6.71,3.63.16.82.29,1.62.37,2.4.08.78.12,1.58.12,2.4v39.76c0,.61-.5,1.11-1.11,1.11h-16c-.61,0-1.11-.5-1.11-1.11v-40.13c0-2.13-.39-3.9-1.17-5.29-.78-1.4-1.87-2.46-3.26-3.2-1.4-.74-3.08-1.11-5.05-1.11-1.72,0-3.38.21-4.98.62s-3.12.99-4.56,1.72c-1.26.65-2.48,1.39-3.65,2.24-.3.21-.47.57-.47.93v44.22c0,.61-.5,1.11-1.11,1.11h-16c-.61,0-1.11-.5-1.11-1.11Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M647,73.7v41.36c0,1.91-.48,2.99-2.63,3.71-8.37,1.91-18.89,2.51-27.13,2.51-17.93,0-27.38-1.91-27.62-20.68.24-16.14,8.61-19.61,24.51-19.61h15.18v-4.31c0-5.74-3.59-8.25-11.24-8.25h-21.64c-1.31,0-1.67-.36-1.67-1.79v-9.8c0-1.43.48-1.67,1.67-1.91,7.29-1.44,14.23-1.79,21.64-1.79,23.67,0,28.93,7.65,28.93,20.56ZM615.56,92.47c-6.21,0-8.37,2.03-8.37,7.17,0,5.74,2.63,7.29,10.16,7.29,2.39,0,8.49-.24,11.95-1.19v-13.27h-13.75Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M658.32,119.57V26.5c0-.61.5-1.11,1.11-1.11h16c.61,0,1.11.5,1.11,1.11v49.85c0,.61.5,1.11,1.11,1.11h6.03c.38,0,.74-.19.94-.52l13.87-21.87c.2-.32.56-.52.94-.52h15.85c.87,0,1.41.96.94,1.7l-18.02,28.86c-.22.36-.23.81,0,1.17l20.03,32.68c.45.74-.08,1.69-.95,1.69h-15.87c-.38,0-.74-.2-.94-.52l-16.09-25.67c-.2-.32-.56-.52-.94-.52h-5.78c-.61,0-1.11.5-1.11,1.11v24.49c0,.61-.5,1.11-1.11,1.11h-16c-.61,0-1.11-.5-1.11-1.11Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M778.82,86.37v3.71c0,2.39-.72,3.23-3.83,3.23h-37.54c.24,10.76,3.11,12.67,13.51,12.67h21.16c1.19,0,1.79.6,1.79,1.79v9.92c0,1.32-.6,1.79-1.67,1.91-6.34,1.31-14.94,1.67-22.83,1.67-24.15,0-30.01-6.81-30.01-34.07s5.86-34.07,30.01-34.07,29.29,6.58,29.41,33.24ZM737.33,81.71h23.67c-.12-10.52-2.87-13.27-11.6-13.27s-11.95,2.75-12.07,13.27Z\"/>\n        <path fill=\"#f9f9f9\" d=\"M824.96,53.13c1.37,0,1.91.6,1.91,2.15v11.36c0,1.19-.72,1.79-2.03,1.79h-11.24c-6.21,0-8.37.96-8.37,6.1v44.23c0,1.31-.6,1.91-1.79,1.91h-14.22c-1.2,0-1.79-.6-1.79-1.91v-48.78c0-15.06,10.76-16.86,21.64-16.86h15.9Z\"/>\n      </g>\n      <g>\n        <path fill=\"#73fa79\" d=\"M500.83,156.94c-.88-.67-1.83-1.2-2.85-1.61-1.03-.41-2.03-.73-3-.97l-2.98-.78c-.6-.15-1.22-.34-1.87-.57-.64-.23-1.25-.53-1.81-.88-.56-.35-1.02-.79-1.36-1.32-.35-.53-.52-1.16-.52-1.88,0-.86.25-1.64.76-2.32.5-.68,1.21-1.22,2.13-1.61.91-.39,2-.59,3.25-.59,1.75,0,3.21.39,4.36,1.17,1.15.78,1.81,1.88,1.97,3.29h4.45c-.04-1.64-.52-3.1-1.43-4.36-.91-1.27-2.17-2.27-3.75-2.99s-3.41-1.09-5.48-1.09-3.89.37-5.52,1.1c-1.63.73-2.93,1.75-3.88,3.07-.95,1.31-1.43,2.85-1.43,4.61,0,2.13.72,3.84,2.14,5.14,1.43,1.29,3.37,2.27,5.81,2.94l3.61.99c1.1.29,2.08.62,2.95,1,.87.38,1.56.86,2.08,1.43.51.58.77,1.32.77,2.22,0,.99-.29,1.86-.88,2.6-.59.74-1.39,1.32-2.41,1.73-1.02.41-2.18.62-3.48.62-1.18,0-2.27-.18-3.26-.53-.99-.36-1.8-.9-2.43-1.63s-.99-1.65-1.08-2.76h-4.63c.1,1.84.62,3.43,1.57,4.77.95,1.34,2.25,2.37,3.93,3.1,1.67.73,3.65,1.09,5.94,1.09s4.43-.39,6.11-1.16c1.69-.78,2.97-1.84,3.87-3.18.89-1.34,1.34-2.88,1.34-4.61,0-1.37-.27-2.55-.81-3.54-.54-.99-1.25-1.81-2.13-2.48Z\"/>\n        <path fill=\"#73fa79\" d=\"M524.35,149.58c-1.45-.94-3.11-1.4-4.96-1.4-1.42,0-2.57.24-3.43.71-.87.47-1.54,1.02-2.03,1.65-.49.63-.86,1.18-1.12,1.66h-.37v-3.72h-4.36v31.53h4.46v-12.17h.27c.27.49.65,1.05,1.15,1.67.5.63,1.19,1.18,2.07,1.64.88.47,2.02.7,3.41.7,1.85,0,3.5-.47,4.94-1.42,1.44-.95,2.58-2.31,3.4-4.07.83-1.77,1.24-3.89,1.24-6.37s-.42-4.6-1.25-6.36c-.83-1.76-1.97-3.11-3.43-4.04ZM523.82,164.07c-.46,1.22-1.14,2.19-2.04,2.9-.89.71-2.01,1.07-3.34,1.07s-2.37-.34-3.25-1.02c-.89-.68-1.56-1.63-2.03-2.84-.47-1.21-.7-2.63-.7-4.24s.23-2.98.69-4.18c.46-1.19,1.13-2.12,2.02-2.79.89-.67,1.98-1,3.28-1s2.47.35,3.37,1.05c.9.7,1.58,1.65,2.03,2.85.45,1.21.68,2.56.68,4.07s-.23,2.91-.69,4.14Z\"/>\n        <path fill=\"#73fa79\" d=\"M548.47,149.65c-1.6-.98-3.48-1.48-5.63-1.48s-4.03.49-5.63,1.48c-1.6.99-2.84,2.37-3.73,4.15-.89,1.78-1.33,3.86-1.33,6.24s.44,4.44,1.33,6.21c.89,1.77,2.13,3.15,3.73,4.13,1.6.99,3.48,1.48,5.63,1.48s4.03-.49,5.63-1.48c1.6-.98,2.85-2.36,3.73-4.13.89-1.77,1.33-3.84,1.33-6.21s-.44-4.46-1.33-6.24c-.89-1.78-2.13-3.16-3.73-4.15ZM548.36,164.07c-.44,1.22-1.12,2.2-2.04,2.94-.92.74-2.07,1.11-3.46,1.11s-2.57-.37-3.49-1.11c-.92-.74-1.6-1.72-2.05-2.94-.44-1.22-.66-2.57-.66-4.05s.22-2.81.66-4.04c.44-1.23,1.12-2.22,2.05-2.96.92-.74,2.08-1.12,3.49-1.12s2.55.37,3.46,1.12c.92.75,1.6,1.74,2.04,2.96.44,1.23.66,2.58.66,4.04s-.22,2.82-.66,4.05Z\"/>\n        <path fill=\"#73fa79\" d=\"M568.03,148.13c-1.34,0-2.55.36-3.6,1.07-1.06.71-1.8,1.68-2.22,2.92h-.24v-3.64h-4.32v22.93h4.46v-14c0-.99.24-1.88.71-2.67.48-.78,1.13-1.39,1.95-1.83.82-.44,1.76-.67,2.82-.67.46,0,.91.03,1.37.1.46.07.77.12.96.17v-4.27c-.22-.03-.52-.05-.91-.08-.38-.02-.71-.03-.99-.03Z\"/>\n        <path fill=\"#73fa79\" d=\"M582.66,167.65c-.27.05-.58.08-.94.08-.49,0-.94-.08-1.35-.23-.42-.15-.75-.45-1.01-.88-.26-.43-.39-1.08-.39-1.95v-12.61h4.7v-3.58h-4.7v-5.49h-4.46v5.49h-3.36v3.58h3.36v13.54c0,1.38.31,2.53.94,3.45.63.92,1.45,1.59,2.46,2.03,1.02.44,2.11.65,3.28.63.72-.01,1.31-.07,1.79-.17.48-.11.85-.21,1.1-.31l-.8-3.69c-.15.03-.36.07-.63.12Z\"/>\n        <path fill=\"#73fa79\" d=\"M599.12,158.57l-3.64-.84c-1.27-.3-2.18-.68-2.75-1.15-.57-.47-.85-1.09-.85-1.85,0-.89.42-1.61,1.27-2.17.85-.56,1.9-.84,3.17-.84.92,0,1.69.15,2.31.45.62.3,1.11.68,1.47,1.15.36.47.63.96.8,1.48l4.04-.72c-.46-1.79-1.4-3.22-2.82-4.29-1.42-1.07-3.37-1.6-5.85-1.6-1.72,0-3.25.28-4.58.86-1.34.57-2.38,1.37-3.14,2.38-.75,1.02-1.13,2.2-1.13,3.55,0,1.63.51,2.98,1.53,4.04,1.02,1.07,2.6,1.84,4.74,2.33l3.88.85c1.09.25,1.91.62,2.44,1.11.53.49.8,1.09.8,1.81,0,.89-.44,1.63-1.31,2.25-.88.61-2.05.92-3.51.92-1.34,0-2.43-.29-3.27-.86-.84-.57-1.39-1.42-1.66-2.54l-4.31.66c.37,2.03,1.36,3.59,2.99,4.69,1.62,1.1,3.72,1.65,6.28,1.65,1.85,0,3.48-.3,4.89-.91,1.41-.61,2.51-1.45,3.3-2.52.79-1.07,1.19-2.29,1.19-3.66,0-1.62-.52-2.94-1.55-3.96-1.04-1.02-2.61-1.77-4.72-2.25Z\"/>\n        <path fill=\"#73fa79\" d=\"M628.05,139.4c-1.21,0-2.34.24-3.37.71-1.03.47-1.87,1.18-2.49,2.13-.63.95-.94,2.14-.94,3.57v2.66h-3.55v3.58h3.55v19.35h4.46v-19.35h4.94v-3.58h-4.94v-2.06c0-1.02.23-1.79.7-2.33.46-.54,1.24-.8,2.32-.8.47,0,.87.04,1.2.12.33.09.6.16.81.22l1.04-3.61c-.31-.12-.78-.25-1.42-.4-.64-.14-1.4-.22-2.3-.22Z\"/>\n        <path fill=\"#73fa79\" d=\"M649.69,149.65c-1.6-.98-3.48-1.48-5.63-1.48s-4.03.49-5.63,1.48c-1.6.99-2.84,2.37-3.73,4.15s-1.33,3.86-1.33,6.24.44,4.44,1.33,6.21,2.13,3.15,3.73,4.13c1.6.99,3.48,1.48,5.63,1.48s4.03-.49,5.63-1.48c1.6-.98,2.85-2.36,3.73-4.13.89-1.77,1.33-3.84,1.33-6.21s-.44-4.46-1.33-6.24c-.89-1.78-2.13-3.16-3.73-4.15ZM649.58,164.07c-.44,1.22-1.12,2.2-2.04,2.94-.91.74-2.07,1.11-3.46,1.11s-2.57-.37-3.49-1.11c-.92-.74-1.6-1.72-2.05-2.94-.44-1.22-.66-2.57-.66-4.05s.22-2.81.66-4.04c.44-1.23,1.12-2.22,2.05-2.96.92-.74,2.08-1.12,3.49-1.12s2.55.37,3.46,1.12c.92.75,1.6,1.74,2.04,2.96.44,1.23.66,2.58.66,4.04s-.22,2.82-.66,4.05Z\"/>\n        <path fill=\"#73fa79\" d=\"M669.26,148.13c-1.34,0-2.55.36-3.61,1.07-1.06.71-1.8,1.68-2.22,2.92h-.24v-3.64h-4.32v22.93h4.46v-14c0-.99.24-1.88.72-2.67.48-.78,1.13-1.39,1.95-1.83.82-.44,1.76-.67,2.82-.67.46,0,.92.03,1.37.1.46.07.77.12.96.17v-4.27c-.22-.03-.52-.05-.91-.08-.38-.02-.71-.03-.99-.03Z\"/>\n        <path fill=\"#73fa79\" d=\"M703.51,156.59c-.97-.6-1.96-.93-2.98-.98v-.3c.94-.24,1.8-.62,2.58-1.14.78-.52,1.41-1.22,1.87-2.09.47-.87.7-1.94.7-3.22,0-1.51-.35-2.87-1.06-4.08-.71-1.21-1.77-2.17-3.19-2.88s-3.22-1.07-5.39-1.07h-11.19v30.57h11.72c2.37,0,4.31-.36,5.84-1.08,1.52-.72,2.65-1.7,3.38-2.94.73-1.24,1.1-2.64,1.1-4.2s-.32-2.93-.95-4.03c-.64-1.1-1.44-1.96-2.41-2.56ZM689.46,144.76h6.3c1.83,0,3.19.43,4.08,1.28.88.86,1.33,1.92,1.33,3.18,0,.99-.25,1.84-.74,2.56-.49.72-1.15,1.28-1.99,1.68-.83.4-1.76.6-2.8.6h-6.18v-9.3ZM700.86,166.16c-.96.86-2.54,1.28-4.75,1.28h-6.66v-9.79h6.82c1.24,0,2.3.24,3.2.72.9.48,1.6,1.12,2.08,1.93.49.8.73,1.69.73,2.65,0,1.28-.48,2.35-1.43,3.21Z\"/>\n        <path fill=\"#73fa79\" d=\"M721.52,148.13c-1.34,0-2.55.36-3.61,1.07-1.06.71-1.8,1.68-2.22,2.92h-.24v-3.64h-4.32v22.93h4.47v-14c0-.99.24-1.88.71-2.67.48-.78,1.13-1.39,1.95-1.83.82-.44,1.76-.67,2.81-.67.46,0,.92.03,1.37.1.46.07.77.12.96.17v-4.27c-.22-.03-.52-.05-.91-.08-.38-.02-.71-.03-.99-.03Z\"/>\n        <path fill=\"#73fa79\" d=\"M741.36,149.67c-.9-.57-1.87-.96-2.9-1.17-1.03-.21-2-.32-2.92-.32-1.38,0-2.7.19-3.96.59-1.25.4-2.36,1.02-3.32,1.88-.96.86-1.69,1.99-2.19,3.38l4.19.95c.33-.8.92-1.54,1.78-2.2.86-.66,2.04-.99,3.55-.99s2.53.36,3.26,1.08c.73.72,1.1,1.73,1.1,3.03v.11c0,.54-.19.93-.58,1.17-.39.24-1.01.41-1.87.51-.86.1-1.97.24-3.34.4-1.08.13-2.15.32-3.19.57-1.05.25-1.99.62-2.84,1.11-.84.49-1.52,1.15-2.02,1.99-.5.83-.75,1.9-.75,3.19,0,1.5.34,2.77,1.02,3.81.68,1.04,1.61,1.82,2.79,2.37,1.17.54,2.49.81,3.94.81,1.27,0,2.35-.18,3.25-.55.91-.37,1.65-.83,2.22-1.39.58-.56,1.01-1.12,1.3-1.7h.18v3.13h4.36v-15.23c0-1.67-.29-3.03-.87-4.08-.58-1.05-1.32-1.86-2.22-2.42ZM739.97,163.13c0,.9-.23,1.75-.69,2.54-.46.79-1.13,1.43-2.02,1.92s-1.94.73-3.17.73-2.3-.28-3.12-.84c-.82-.56-1.22-1.39-1.22-2.5,0-.8.21-1.44.63-1.92.42-.48.99-.85,1.7-1.11.71-.26,1.5-.44,2.37-.55.37-.05.83-.11,1.37-.18.55-.08,1.11-.16,1.69-.25.58-.09,1.09-.21,1.54-.34.46-.13.76-.28.92-.44v2.96Z\"/>\n        <path fill=\"#73fa79\" d=\"M764.97,149.15c-1.18-.65-2.55-.98-4.11-.98-1.72,0-3.15.37-4.28,1.11-1.13.73-1.96,1.71-2.49,2.92h-.28v-3.73h-4.29v22.93h4.46v-13.61c0-1.21.23-2.25.69-3.11.46-.86,1.09-1.51,1.9-1.96.8-.45,1.72-.67,2.75-.67,1.51,0,2.7.47,3.57,1.41.87.94,1.3,2.24,1.3,3.9v14.05h4.46v-14.58c0-1.89-.32-3.48-.97-4.76-.65-1.28-1.56-2.25-2.73-2.9Z\"/>\n        <path fill=\"#73fa79\" d=\"M789.28,152.19h-.27c-.27-.48-.64-1.03-1.13-1.66-.48-.63-1.16-1.18-2.03-1.65-.87-.47-2.02-.71-3.44-.71-1.84,0-3.49.47-4.94,1.4-1.45.93-2.6,2.28-3.43,4.04-.83,1.76-1.25,3.88-1.25,6.36s.41,4.6,1.23,6.37c.82,1.77,1.96,3.12,3.4,4.07,1.45.95,3.1,1.42,4.95,1.42,1.39,0,2.53-.23,3.4-.7.88-.47,1.56-1.01,2.07-1.64.5-.63.89-1.18,1.16-1.67h.37v3.57h4.36v-30.57h-4.46v11.36ZM788.66,164.18c-.46,1.21-1.14,2.16-2.03,2.84-.89.68-1.98,1.02-3.26,1.02s-2.43-.36-3.33-1.07c-.9-.71-1.58-1.68-2.04-2.9-.46-1.22-.69-2.6-.69-4.14s.23-2.87.68-4.07c.45-1.2,1.13-2.15,2.02-2.85.89-.7,2.01-1.05,3.36-1.05s2.4.33,3.28,1c.89.67,1.56,1.6,2.02,2.79s.69,2.59.69,4.18-.23,3.03-.7,4.24Z\"/>\n        <path fill=\"#73fa79\" d=\"M810.62,158.57l-3.64-.84c-1.27-.3-2.18-.68-2.75-1.15-.57-.47-.85-1.09-.85-1.85,0-.89.42-1.61,1.27-2.17.85-.56,1.9-.84,3.17-.84.92,0,1.7.15,2.31.45.62.3,1.11.68,1.47,1.15.36.47.63.96.8,1.48l4.05-.72c-.46-1.79-1.4-3.22-2.82-4.29-1.42-1.07-3.37-1.6-5.85-1.6-1.72,0-3.25.28-4.58.86-1.34.57-2.38,1.37-3.14,2.38-.76,1.02-1.13,2.2-1.13,3.55,0,1.63.51,2.98,1.53,4.04,1.02,1.07,2.6,1.84,4.74,2.33l3.88.85c1.09.25,1.91.62,2.44,1.11.53.49.8,1.09.8,1.81,0,.89-.44,1.63-1.31,2.25-.87.61-2.05.92-3.51.92-1.34,0-2.43-.29-3.27-.86-.84-.57-1.39-1.42-1.66-2.54l-4.31.66c.37,2.03,1.36,3.59,2.99,4.69,1.62,1.1,3.72,1.65,6.28,1.65,1.85,0,3.48-.3,4.89-.91,1.41-.61,2.51-1.45,3.3-2.52.79-1.07,1.19-2.29,1.19-3.66,0-1.62-.52-2.94-1.55-3.96-1.04-1.02-2.61-1.77-4.72-2.25Z\"/>\n        <path fill=\"#73fa79\" d=\"M825.99,166.6c-.59-.58-1.29-.88-2.1-.88s-1.52.29-2.1.88c-.59.58-.88,1.28-.88,2.1s.29,1.53.88,2.11c.59.58,1.29.88,2.1.88.55,0,1.05-.14,1.49-.4.45-.27.81-.63,1.08-1.08.27-.45.41-.95.41-1.5,0-.82-.3-1.52-.88-2.1Z\"/>\n      </g>\n      <path fill=\"#73fa79\" d=\"M178.07,77.3c-4.59-12.63-16.25-23.45-29.68-27.58l-57.76-14.44-4.88-13.41L0,0l46.5,127.76,18.99,52.24h27.87l-21.66-59.5,44.65-14.55,4.88,13.41,47.22-14.47c10.45-4.1,14.21-14.95,9.62-27.58ZM152.06,81.81l-40.45,11.11-4.88-13.4-45.19,13.06-20.87-57.29h.03l54.66,13.03,4.88,13.41,48.54,11.08c3.16.98,4.39,3.24,4.85,4.51.46,1.26.89,3.53-1.58,4.51Z\"/>\n    </g>\n  </g>\n</svg>";

// ================================================================
// PLAYMAKER BRAND TOKENS
// ================================================================
const C = {
  bg: "#171917",
  card: "#1C1E1C",
  cardHover: "#202220",
  green: "#73FA79",
  greenDark: "#5BC15B",
  white: "#F9F9F9",
  grey: "#8E918E",
  steel: "#313331",
  border: "rgba(255,255,255,0.06)",
  borderMid: "rgba(255,255,255,0.10)",
  borderStrong: "rgba(255,255,255,0.16)",
  red: "#FF5C5C",
  yellow: "#FFD166",
  orange: "#FF9A3C",
  blue: "#7EC8E3",
  purple: "#C4B5FD",
};

const FONT_HEAD = "'Familjen Grotesk', 'Inter', sans-serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

const CYCLE_COLOR = {
  FWC22: C.green,
  FWWC23: C.purple,
  FIC24: C.blue,
  FCWC25: C.yellow,
  FIC25: C.orange,
  FWCC26: C.red,
  FWC26: C.greenDark,
};

const CYCLE_LABEL = {
  FWC22: "FWC22 · Contract 99313",
  FWWC23: "FWWC23 · Contract 105215",
  FIC24: "FIC24 · Contract 40005352",
  FCWC25: "FCWC25 · Contract 40005390",
  FIC25: "FIC25 · Contract 40005890",
};

const fmt = {
  units: (n) => {
    if (n == null) return "-";
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString("pt-BR");
  },
  unitsFull: (n) => (n == null ? "-" : Math.round(n).toLocaleString("pt-BR")),
  usd: (n) => {
    if (n == null) return "-";
    if (Math.abs(n) >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (Math.abs(n) >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + n.toFixed(2);
  },
  usdFull: (n) =>
    n == null
      ? "-"
      : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  pct: (n) => (n == null ? "-" : n.toFixed(1) + "%"),
};

const useFiltered = (cycle) =>
  useMemo(() => {
    const lines = cycle === "ALL" ? DATA.lines : DATA.lines.filter((l) => l.cycle === cycle);
    const skus = cycle === "ALL" ? DATA.skus : DATA.skus.filter((s) => s.cycle === cycle);

    const kpis = lines.reduce(
      (acc, l) => {
        acc.total_units += l.units;
        acc.total_gross += l.gross_sales_usd;
        acc.total_royalties += l.royalty_amount_usd;
        if (l.leaked) {
          acc.total_overpaid += l.overpaid;
          acc.leaked_units += l.units;
        }
        return acc;
      },
      { total_units: 0, total_gross: 0, total_royalties: 0, total_overpaid: 0, leaked_units: 0 }
    );
    kpis.net_revenue = kpis.total_gross - kpis.total_royalties;

    const qMap = {};
    lines.forEach((l) => {
      if (!qMap[l.quarter]) {
        qMap[l.quarter] = {
          quarter: l.quarter,
          units: 0, gross: 0, royalties: 0, overpaid: 0,
          fwc22_units: 0, fwwc23_units: 0,
          ecoflex_units: 0, tpu_units: 0,
        };
      }
      qMap[l.quarter].units += l.units;
      qMap[l.quarter].gross += l.gross_sales_usd;
      qMap[l.quarter].royalties += l.royalty_amount_usd;
      if (l.leaked) qMap[l.quarter].overpaid += l.overpaid;
      qMap[l.quarter][l.cycle.toLowerCase() + "_units"] += l.units;
      if (l.material === "Ecoflex") qMap[l.quarter].ecoflex_units += l.units;
      else if (l.material === "TPU") qMap[l.quarter].tpu_units += l.units;
    });
    const qSort = (q) => {
      const parts = q.split(" ");
      return parseInt(parts[1]) * 10 + parseInt(parts[0].replace("Q", ""));
    };
    const quarters = Object.values(qMap).sort((a, b) => qSort(a.quarter) - qSort(b.quarter));

    const cMap = {};
    lines.forEach((l) => {
      if (!cMap[l.country]) cMap[l.country] = { country: l.country, units: 0, gross: 0, royalties: 0 };
      cMap[l.country].units += l.units;
      cMap[l.country].gross += l.gross_sales_usd;
      cMap[l.country].royalties += l.royalty_amount_usd;
    });
    const countries = Object.values(cMap).sort((a, b) => b.units - a.units);

    const chMap = {};
    lines.forEach((l) => {
      if (!chMap[l.channel]) chMap[l.channel] = { channel: l.channel, units: 0, gross: 0, royalties: 0 };
      chMap[l.channel].units += l.units;
      chMap[l.channel].gross += l.gross_sales_usd;
      chMap[l.channel].royalties += l.royalty_amount_usd;
    });
    const channels = Object.values(chMap).sort((a, b) => b.units - a.units);

    const mMap = {};
    lines.forEach((l) => {
      if (!mMap[l.material]) mMap[l.material] = { material: l.material, units: 0, gross: 0, royalties: 0, overpaid: 0 };
      mMap[l.material].units += l.units;
      mMap[l.material].gross += l.gross_sales_usd;
      mMap[l.material].royalties += l.royalty_amount_usd;
      if (l.leaked) mMap[l.material].overpaid += l.overpaid;
    });
    const materials = Object.values(mMap);

    return { kpis, quarters, countries, channels, materials, skus, lines };
  }, [cycle]);

const PlaymakerLogo = ({ height = 28 }) => (
  <div
    style={{ height, display: "flex", alignItems: "center" }}
    dangerouslySetInnerHTML={{
      __html: PLAYMAKER_LOGO_SVG.replace("<svg ", `<svg style="height:${height}px;width:auto;" `),
    }}
  />
);

const KpiCard = ({ label, value, sub, accent = C.white, icon: Icon, onClick, hint }) => (
  <div
    onClick={onClick}
    style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px",
      cursor: onClick ? "pointer" : "default", transition: "all 0.15s ease", position: "relative", overflow: "hidden",
    }}
    onMouseEnter={(e) => { if (onClick) { e.currentTarget.style.background = C.cardHover; e.currentTarget.style.borderColor = C.borderMid; } }}
    onMouseLeave={(e) => { if (onClick) { e.currentTarget.style.background = C.card; e.currentTarget.style.borderColor = C.border; } }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
      {Icon && <Icon size={11} color={C.grey} strokeWidth={2} />}
      <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
    <div style={{ fontFamily: FONT_HEAD, fontSize: 26, fontWeight: 700, color: accent, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: sub ? 6 : 0 }}>
      {value}
    </div>
    {sub && <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, lineHeight: 1.3 }}>{sub}</div>}
    {hint && <div style={{ position: "absolute", top: 10, right: 10, fontFamily: FONT_BODY, fontSize: 9, color: C.grey, opacity: 0.6 }}>{hint}</div>}
  </div>
);

const TabButton = ({ active, onClick, children, count, icon: Icon, accent }) => (
  <button onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 8, padding: "9px 14px",
      background: active ? C.card : "transparent",
      border: `1px solid ${active ? C.borderMid : "transparent"}`,
      borderRadius: 8, cursor: "pointer", transition: "all 0.15s ease",
      fontFamily: FONT_HEAD, fontSize: 11.5, fontWeight: 600, letterSpacing: "0.04em",
      color: active ? C.white : C.grey, textTransform: "uppercase",
    }}
    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = C.white; } }}
    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.grey; } }}
  >
    {Icon && <Icon size={13} color={active ? accent || C.green : C.grey} strokeWidth={2} />}
    <span>{children}</span>
    {count != null && (
      <span style={{ fontFamily: FONT_BODY, fontSize: 10, color: active ? accent || C.green : C.grey, fontWeight: 700, marginLeft: 2 }}>{count}</span>
    )}
  </button>
);

const Section = ({ title, kicker, accent = C.green, children, right }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.10em", color: accent, textTransform: "uppercase" }}>{kicker}</span>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 600, color: C.white, letterSpacing: "-0.01em" }}>{title}</span>
      </div>
      {right}
    </div>
    {children}
  </div>
);

const ChartTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.borderStrong}`, borderRadius: 8, padding: "10px 12px", fontFamily: FONT_BODY, fontSize: 11.5, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: C.grey, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: C.white, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color || p.fill, display: "inline-block" }} />
          <span style={{ color: C.grey }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

const LegendDot = ({ color, label, line }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ width: line ? 12 : 8, height: line ? 2 : 8, borderRadius: line ? 1 : 2, background: color, display: "inline-block" }} />
    <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey }}>{label}</span>
  </div>
);

const MiniStat = ({ label, value, sub, accent = C.white, small }) => (
  <div>
    <div style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>{label}</div>
    <div style={{ fontFamily: FONT_HEAD, fontSize: small ? 13 : 17, fontWeight: 700, color: accent, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 3 }}>{sub}</div>}
  </div>
);

const HeaderCell = ({ children, align = "left" }) => (
  <div style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, paddingBottom: 8, borderBottom: `1px solid ${C.border}`, textAlign: align }}>{children}</div>
);

const Cell2 = ({ children, align = "left", mono, accent = C.white }) => (
  <div style={{ color: accent, textAlign: align, fontFamily: mono ? FONT_HEAD : FONT_BODY, fontSize: 12, paddingTop: 6, paddingBottom: 6, borderBottom: `1px solid ${C.border}`, fontWeight: mono ? 600 : 400, letterSpacing: mono ? "-0.01em" : "0" }}>{children}</div>
);

const VisaoGeral = ({ data, cycle }) => {
  const totalUnits = data.kpis.total_units;
  const isAll = cycle === "ALL";
  const chartData = data.quarters.map((q) => ({ ...q, gross_k: q.gross / 1000 }));

  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Info size={15} color={C.green} style={{ marginTop: 2 }} />
        <div>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 3 }}>
            {isAll ? "Headline portfolio" : "Headline " + cycle}
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, lineHeight: 1.5 }}>
            {isAll && (
              <>
                Portfolio Champions Badge da Cromotransfer cobre 5 contratos FIFA ativos (FWC22, FWWC23,
                FIC24, FCWC25 e FIC25), somando {fmt.unitsFull(totalUnits)} unidades e {fmt.usd(data.kpis.total_gross)}
                de receita bruta entre Q1 2023 e Q1 2026. FWC22 representa {fmt.pct((DATA.cycles.FWC22.total_units / totalUnits) * 100)}
                {" "}do volume e já capturou economia direta de royalty pela renegociação Playmaker × FIFA
                (taxa diferenciada de 0.25 para Ecoflex a partir de Q2 2025). FWWC23, FIC24, FCWC25 e FIC25
                operam em contrato flat US$ 0.45, sem diferenciação por material. A partir do FWC26, todos
                os contratos FIFA passam ao novo modelo: royalty percentual fixo de 20% sobre receita bruta.
              </>
            )}
            {cycle === "FWC22" && (
              <>
                FWC22 entregou {fmt.unitsFull(totalUnits)} unidades em 13 trimestres. Pico em Q2 2025 (1.93M un.,
                demanda real adidas/Argentina FWC26). A renegociação da taxa Ecoflex conduzida pela Playmaker
                (US$ 0.45 para 0.25) entrou em vigor no mesmo trimestre, capturando economia direta para a
                Cromotransfer em todas as ondas de venda subsequentes.
              </>
            )}
            {cycle === "FWWC23" && (
              <>
                FWWC23 entregou {fmt.unitsFull(totalUnits)} unidades em 11 trimestres. Pico em Q3 2024 (~50K un.),
                ~1 ano pós-tournament. Volume ~46x menor que FWC22, dimensão "ciclo regular pós-tournament" sem
                pico de demanda massiva. Camboja apareceu como novo território. Preço Ecoflex caiu de US$ 1.12
                para US$ 0.98 em Q2 2025. Contrato flat US$ 0.45 sem diferenciação por material.
              </>
            )}
            {cycle === "FIC24" && (
              <>
                FIC24 entregou {fmt.unitsFull(totalUnits)} unidades em 3 trimestres (Q2 a Q4 2025), todas Ecoflex.
                Concentração massiva na Irlanda como hub europeu de distribuição. SKUs E137264 e E143929 a
                preços de US$ 2.10 e US$ 1.68. Contrato flat US$ 0.45, sem diferenciação por material:
                trade-off da decisão de não estender a renegociação Playmaker × FIFA aos contratos
                intermediários.
              </>
            )}
            {cycle === "FCWC25" && (
              <>
                FCWC25 entregou {fmt.unitsFull(totalUnits)} unidades em 4 trimestres (Q2 2025 a Q1 2026), todas TPU.
                Maior diversidade geográfica do portfólio: 21 países, com Brasil entrando como mercado relevante
                (sediou o torneio em junho/julho 2025). Preços altos por unidade (US$ 3.66 a US$ 4.23). Inclui
                vendas iniciais do FWC26 (SKU E143425, "FWC 26 COMPETITION JUNIOR") sob o contrato FCWC25.
                Royalty flat US$ 0.45, sem diferenciação.
              </>
            )}
            {cycle === "FIC25" && (
              <>
                FIC25 entregou {fmt.unitsFull(totalUnits)} unidades em 2 trimestres (Q4 2025 e Q1 2026), todas TPU,
                exclusivamente via Irlanda como hub europeu. SKUs E155217 e E158955 a preços de US$ 2.85 e
                US$ 2.28. Contrato flat US$ 0.45, sem diferenciação por material.
              </>
            )}
          </div>
        </div>
      </div>

      <Section
        kicker="Evolução"
        title="Volume e Receita por Trimestre"
        right={
          <div style={{ display: "flex", gap: 12 }}>
            {isAll ? (
              <>
                <LegendDot color={C.green} label="FWC22 (un)" />
                <LegendDot color={C.purple} label="FWWC23 (un)" />
              </>
            ) : (
              <>
                <LegendDot color={C.green} label="Ecoflex (un)" />
                <LegendDot color={C.yellow} label="TPU (un)" />
              </>
            )}
            <LegendDot color={C.blue} label="Receita (USD)" line />
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
            <XAxis dataKey="quarter" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
            <YAxis yAxisId="left" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.units} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={(v) => fmt.usd(v * 1000)} />
            <Tooltip content={<ChartTooltip formatter={(v, n) => { if (n.includes("Receita")) return fmt.usd(v * 1000); return fmt.unitsFull(v); }} />} />
            {isAll ? (
              <>
                <Bar yAxisId="left" dataKey="fwc22_units" name="FWC22 (un)" fill={C.green} stackId="a" />
                <Bar yAxisId="left" dataKey="fwwc23_units" name="FWWC23 (un)" fill={C.purple} stackId="a" radius={[2, 2, 0, 0]} />
              </>
            ) : (
              <>
                <Bar yAxisId="left" dataKey="ecoflex_units" name="Ecoflex (un)" fill={C.green} stackId="a" />
                <Bar yAxisId="left" dataKey="tpu_units" name="TPU (un)" fill={C.yellow} stackId="a" radius={[2, 2, 0, 0]} />
              </>
            )}
            <Line yAxisId="right" type="monotone" dataKey="gross_k" name="Receita Bruta" stroke={C.blue} strokeWidth={2} dot={{ r: 3, fill: C.blue }} activeDot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </Section>

      {isAll && (
        <Section kicker="Comparativo" title="Ciclos por Performance">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {Object.entries(DATA.cycles).map(([cyc, info]) => {
              const color = CYCLE_COLOR[cyc] || C.green;
              const pctVol = (info.total_units / DATA.kpis_total.total_units) * 100;
              const pctRev = (info.total_gross / DATA.kpis_total.total_gross) * 100;
              return (
                <div key={cyc} style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: FONT_HEAD, fontSize: 16, fontWeight: 700, color, letterSpacing: "0.04em", textTransform: "uppercase" }}>{cyc}</div>
                      <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginTop: 2 }}>Contract {info.contract} · {info.period}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <MiniStat label="Volume" value={fmt.units(info.total_units)} sub={fmt.pct(pctVol)} small />
                    <MiniStat label="Receita" value={fmt.usd(info.total_gross)} sub={fmt.pct(pctRev)} small />
                    <MiniStat label="Royalties" value={fmt.usd(info.total_royalties)} small />
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}`, fontFamily: FONT_BODY, fontSize: 11.5 }}>
                    {info.total_overpaid > 0 ? (() => {
                      const post = DATA.lines.filter(l => l.cycle === cyc && l.material === "Ecoflex" && l.royalty_rate === 0.25);
                      const sav = post.reduce((a,l) => a + l.units * 0.20, 0);
                      return (
                        <span style={{ color: C.green }}>
                          Captura: <b>{fmt.usd(sav)}</b> ja economizados pela renegociação Playmaker
                        </span>
                      );
                    })() : (
                      <span style={{ color: C.grey }}>Contrato flat US$ 0.45. Sem diferenciação por material.</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Section kicker="Material" title="Mix por Material">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {data.materials.map((m, i) => {
              const pct = (m.units / totalUnits) * 100;
              const color = m.material === "Ecoflex" ? C.green : C.yellow;
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: 13, fontWeight: 700, color: C.white, textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.material}</span>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey }}>{fmt.unitsFull(m.units)} un. · {fmt.pct(pct)}</span>
                    </div>
                    <span style={{ fontFamily: FONT_HEAD, fontSize: 14, fontWeight: 700, color }}>{fmt.usd(m.gross)}</span>
                  </div>
                  <div style={{ height: 6, background: C.steel, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 3 }} />
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 4 }}>
                    Royalty pago: {fmt.usd(m.royalties)}
                    {m.overpaid > 0.01 && <span style={{ color: C.red, marginLeft: 8 }}>· pago a mais {fmt.usd(m.overpaid)}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section kicker="Geografia" title="Top 5 Países">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.countries.slice(0, 5).map((c, i) => {
              const pct = (c.units / totalUnits) * 100;
              const isTop = i === 0;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 11, color: C.grey, width: 18, fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, fontWeight: 500 }}>{c.country}</span>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: 12, color: isTop ? C.yellow : C.white, fontWeight: 700 }}>{fmt.pct(pct)}</span>
                    </div>
                    <div style={{ height: 4, background: C.steel, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: pct + "%", height: "100%", background: isTop ? C.yellow : C.green, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.grey, marginTop: 3 }}>{fmt.unitsFull(c.units)} un. · {fmt.usd(c.gross)}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {data.countries[0] && data.countries[0].units / totalUnits > 0.5 && (
            <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(255,209,102,0.08)", border: `1px solid rgba(255,209,102,0.2)`, borderRadius: 6, fontFamily: FONT_BODY, fontSize: 11, color: C.white, display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.4 }}>
              <AlertTriangle size={13} color={C.yellow} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>
                Concentração critica: {data.countries[0].country} responde por {fmt.pct((data.countries[0].units / totalUnits) * 100)} do volume. Risco operacional para FWC26.
              </span>
            </div>
          )}
        </Section>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <Section kicker="Produtos" title={"Performance por SKU " + (isAll ? "(ambos os ciclos)" : "(" + cycle + ")")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {data.skus.slice(0, 6).map((sku, i) => {
              const pct = (sku.units / totalUnits) * 100;
              const matColor = sku.material === "Ecoflex" ? C.green : C.yellow;
              const cycColor = CYCLE_COLOR[sku.cycle] || C.green;
              return (
                <div key={i} style={{ padding: "10px 12px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 6, height: 36, background: matColor, borderRadius: 3 }} />
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 2 }}>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: 13, color: C.white, fontWeight: 700, letterSpacing: "0.02em" }}>{sku.ref}</span>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: 9, color: cycColor, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "1px 5px", borderRadius: 3, border: `1px solid ${cycColor}40` }}>{sku.cycle}</span>
                      <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, color: matColor, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{sku.material}</span>
                    </div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, lineHeight: 1.3 }}>
                      {sku.first_qtr} → {sku.last_qtr} · {sku.territories.length} pais(es) · ${" "}
                      {sku.price_points.map((p) => p.toFixed(2)).join(" / ")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 13, color: C.white, fontWeight: 700 }}>{fmt.units(sku.units)}</div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.grey }}>un.</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 13, color: C.white, fontWeight: 700 }}>{fmt.usd(sku.gross)}</div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 10, color: C.grey }}>gross</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 50 }}>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 13, color: matColor, fontWeight: 700 }}>{fmt.pct(pct)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

      </div>
    </div>
  );
};

const SKUsView = ({ data, cycle }) => {
  const [expandedSku, setExpandedSku] = useState(null);
  return (
    <div>
      {data.skus.map((sku, i) => {
        const pct = (sku.units / data.kpis.total_units) * 100;
        const matColor = sku.material === "Ecoflex" ? C.green : C.yellow;
        const cycColor = CYCLE_COLOR[sku.cycle] || C.green;
        const skuKey = sku.cycle + "-" + sku.ref;
        const isExpanded = expandedSku === skuKey;
        const skuLines = data.lines.filter((l) => l.product_ref === sku.ref && l.cycle === sku.cycle);
        const byQ = {};
        skuLines.forEach((l) => { if (!byQ[l.quarter]) byQ[l.quarter] = { quarter: l.quarter, units: 0 }; byQ[l.quarter].units += l.units; });
        const qSort = (q) => { const parts = q.split(" "); return parseInt(parts[1]) * 10 + parseInt(parts[0].replace("Q", "")); };
        const skuQ = Object.values(byQ).sort((a, b) => qSort(a.quarter) - qSort(b.quarter));
        return (
          <Section key={i} kicker={sku.ref + " · " + sku.cycle} title={sku.description} accent={matColor}
            right={
              <button onClick={() => setExpandedSku(isExpanded ? null : skuKey)}
                style={{ background: "transparent", border: `1px solid ${C.borderMid}`, borderRadius: 6, padding: "4px 10px", color: C.grey, fontFamily: FONT_HEAD, fontSize: 10, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
                {isExpanded ? "Recolher" : "Detalhes"}
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
            }
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: isExpanded ? 16 : 0, alignItems: "start" }}>
              <MiniStat label="Ciclo" value={sku.cycle} accent={cycColor} small />
              <MiniStat label="Material" value={sku.material} accent={matColor} small />
              <MiniStat label="Unidades" value={fmt.units(sku.units)} sub={fmt.pct(pct)} small />
              <MiniStat label="Preco(s)" value={"$" + sku.price_points.map((p) => p.toFixed(2)).join(" / ")} small />
              <MiniStat label="Receita" value={fmt.usd(sku.gross)} small />
              <MiniStat label="Royalty" value={fmt.usd(sku.royalties)} small />
              <MiniStat label="Periodo" value={sku.first_qtr + " → " + sku.last_qtr} small />
            </div>
            {isExpanded && (
              <>
                <div style={{ height: 1, background: C.border, margin: "8px 0 16px" }} />
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, color: C.grey, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Volume por trimestre</div>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={skuQ} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
                      <XAxis dataKey="quarter" tick={{ fill: C.grey, fontSize: 9, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
                      <YAxis tick={{ fill: C.grey, fontSize: 9, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.units} />
                      <Tooltip content={<ChartTooltip formatter={(v) => fmt.unitsFull(v)} />} />
                      <Bar dataKey="units" name="Unidades" fill={matColor} radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, color: C.grey, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Territorios</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {sku.territories.map((t, j) => (
                        <span key={j} style={{ fontFamily: FONT_BODY, fontSize: 11, padding: "3px 8px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, color: C.white }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, color: C.grey, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Canais</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {sku.channels.map((ch, j) => (
                        <span key={j} style={{ fontFamily: FONT_BODY, fontSize: 11, padding: "3px 8px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4, color: C.white }}>{ch}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {sku.overpaid > 0.01 && (
                  <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(255,92,92,0.08)", border: `1px solid rgba(255,92,92,0.2)`, borderRadius: 6, fontFamily: FONT_BODY, fontSize: 11, color: C.white, display: "flex", alignItems: "flex-start", gap: 6 }}>
                    <AlertCircle size={13} color={C.red} style={{ marginTop: 1, flexShrink: 0 }} />
                    <span>Esse SKU acumula <b>{fmt.usd(sku.overpaid)}</b> de royalty pago a mais a FIFA antes da correção da taxa em Q2 2025. Detalhe na aba Auditoria.</span>
                  </div>
                )}
              </>
            )}
          </Section>
        );
      })}
    </div>
  );
};

const GeografiaView = ({ data }) => {
  const total = data.kpis.total_units;
  const concentrationRisk = data.countries.length > 0 && data.countries[0].units / total > 0.5;
  return (
    <div>
      {concentrationRisk && (
        <div style={{ background: C.card, border: `1px solid rgba(255,209,102,0.3)`, borderLeft: `3px solid ${C.yellow}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <AlertTriangle size={18} color={C.yellow} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 11, letterSpacing: "0.08em", color: C.yellow, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Risco de concentração</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, lineHeight: 1.5 }}>
                {data.countries[0].country} responde por {fmt.pct((data.countries[0].units / total) * 100)} do volume ({fmt.unitsFull(data.countries[0].units)} unidades).
                Os {data.countries.length - 1} demais paises somam {fmt.pct(100 - (data.countries[0].units / total) * 100)}.
                Para FWC26, vale considerar diversificação ativa de canais e plano B caso o distribuidor da Tailândia reduza ritmo.
              </div>
            </div>
          </div>
        </div>
      )}
      <Section kicker="Mapa de Volume" title={"Distribuição por País (" + data.countries.length + ")"}>
        <ResponsiveContainer width="100%" height={Math.max(280, data.countries.length * 32)}>
          <BarChart data={data.countries} layout="vertical" margin={{ top: 4, right: 60, left: 100, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.steel} horizontal={false} />
            <XAxis type="number" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} tickFormatter={fmt.units} />
            <YAxis type="category" dataKey="country" tick={{ fill: C.white, fontSize: 11, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} width={95} />
            <Tooltip content={<ChartTooltip formatter={(v, n) => (n.includes("Unidades") ? fmt.unitsFull(v) : fmt.usdFull(v))} />} />
            <Bar dataKey="units" name="Unidades" radius={[0, 2, 2, 0]}>
              {data.countries.map((c, i) => (
                <Cell key={i} fill={i === 0 ? C.yellow : i < 3 ? C.green : C.greenDark} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Section>
      <Section kicker="Detalhe" title="País por País">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: "8px 16px", fontFamily: FONT_BODY, fontSize: 11.5 }}>
          <HeaderCell>País</HeaderCell>
          <HeaderCell align="right">Unidades</HeaderCell>
          <HeaderCell align="right">% do total</HeaderCell>
          <HeaderCell align="right">Receita</HeaderCell>
          <HeaderCell align="right">Royalties</HeaderCell>
          {data.countries.map((c, i) => (
            <React.Fragment key={i}>
              <Cell2><span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 700, color: C.grey, marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>{c.country}</Cell2>
              <Cell2 align="right" mono>{fmt.unitsFull(c.units)}</Cell2>
              <Cell2 align="right" mono accent={i === 0 ? C.yellow : C.white}>{fmt.pct((c.units / total) * 100)}</Cell2>
              <Cell2 align="right" mono>{fmt.usdFull(c.gross)}</Cell2>
              <Cell2 align="right" mono>{fmt.usdFull(c.royalties)}</Cell2>
            </React.Fragment>
          ))}
        </div>
      </Section>
    </div>
  );
};

const AuditoriaView = ({ data, cycle }) => {
  // Computar a história da renegociação a partir das linhas FWC22 Ecoflex
  const fwc22Ecoflex = data.lines.filter((l) => l.cycle === "FWC22" && l.material === "Ecoflex");
  const ecoflexPost = fwc22Ecoflex.filter((l) => l.royalty_rate === 0.25);
  const ecoflexPre = fwc22Ecoflex.filter((l) => l.royalty_rate === 0.45);

  const savingsCaptured = ecoflexPost.reduce((a, l) => a + l.units * 0.20, 0);
  const savingsUnits = ecoflexPost.reduce((a, l) => a + l.units, 0);
  const windowAmount = ecoflexPre.reduce((a, l) => a + l.overpaid, 0);
  const windowUnits = ecoflexPre.reduce((a, l) => a + l.units, 0);
  const netCapture = savingsCaptured - windowAmount;
  const multiplier = windowAmount > 0 ? savingsCaptured / windowAmount : 0;

  // Trimestres ativos pós-correção
  const postQuarters = [...new Set(ecoflexPost.map((l) => l.quarter))];
  const avgSavingsPerQ = postQuarters.length > 0 ? savingsCaptured / postQuarters.length : 0;

  // Trade-off explícito para ciclos com Ecoflex em contrato não-renegociado (FWWC23, FIC24)
  if (cycle === "FWWC23" || cycle === "FIC24") {
    const ecoLines = data.lines.filter((l) => l.material === "Ecoflex");
    const ecoUnits = ecoLines.reduce((a, l) => a + l.units, 0);
    const ecoPaid = ecoLines.reduce((a, l) => a + l.royalty_amount_usd, 0);
    const fwwc23TradeOff = ecoPaid - ecoUnits * 0.25;
    const fwwc23Units = ecoUnits;
    const fwwc23Paid = ecoPaid;
    const cycLabel = cycle === "FIC24" ? "FIC24" : "FWWC23";
    const cycContract = cycle === "FIC24" ? "40005352" : "105215";

    return (
      <div>
        <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(255,209,102,0.08) 100%)`, border: `1px solid rgba(255,209,102,0.3)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.yellow, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
                Trade-off da decisão de não estender a renegociação
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 48, color: C.white, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 12 }}>
                {fmt.usdFull(fwwc23TradeOff)}
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, lineHeight: 1.6, maxWidth: 720 }}>
                Valor que poderia ter sido capturado se a renegociação Playmaker × FIFA do contrato 99313
                (FWC22) tivesse sido estendida ao {cycContract} ({cycLabel}). Foram <b>{fmt.unitsFull(fwwc23Units)}</b>
                {" "}unidades Ecoflex cobradas a US$ 0.45, contra US$ 0.25 que valeria com a estrutura
                diferenciada. A decisão de não incluir o FWWC23 na renegociação foi consciente naquela
                janela, dado o volume substancialmente menor desses ciclos vs o FWC22 ({fwwc23Units > 200000 ? "~16x menor" : "~46x menor"}). Importante
                quantificar o trade-off como referência para a estratégia de royalties dos próximos
                contratos.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Unidades Ecoflex</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.white, fontWeight: 700 }}>{fmt.unitsFull(fwwc23Units)}</div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Pago a 0.45</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 16, color: C.yellow, fontWeight: 700 }}>{fmt.usdFull(fwwc23Paid)}</div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Pagaria a 0.25</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 16, color: C.green, fontWeight: 700 }}>{fmt.usdFull(fwwc23Units * 0.25)}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.green}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Info size={16} color={C.green} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
                Estrutura nova a partir do FWC26
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.6 }}>
                A partir do contrato FWC26, todos os acordos passam a usar royalty percentual fixo de 20%
                sobre a receita bruta, substituindo a estrutura de centavos por unidade. A discussão de
                "estender a renegociação" deixa de ser relevante: o novo modelo alinha incentivos via
                percentual, sem distinção por material.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FCWC25 e FIC25: TPU only, sem trade-off, informational
  if (cycle === "FCWC25" || cycle === "FIC25") {
    return (
      <div>
        <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(126,200,227,0.08) 100%)`, border: `1px solid rgba(126,200,227,0.25)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <Info size={28} color={C.blue} style={{ marginTop: 4, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.blue, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
                Ciclo TPU exclusivo, sem aplicabilidade da renegociação
              </div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 32, color: C.white, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 12 }}>
                US$ 0.45 por unidade
              </div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, lineHeight: 1.6, maxWidth: 720 }}>
                {cycle} é um ciclo composto exclusivamente por SKUs TPU. A renegociação Playmaker × FIFA
                que introduziu a taxa diferenciada de US$ 0.25 vale apenas para Ecoflex no contrato 99313
                (FWC22), portanto não há trade-off aplicável aqui. A taxa de US$ 0.45 sobre TPU está dentro
                do termo do contrato e da estrutura padrão FIFA. A partir do FWC26, todos os acordos passam
                ao modelo percentual fixo de 20% sobre receita bruta.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FWC22 individual ou ALL: contar a história da renegociação
  return (
    <div>
      {/* HERO: economia capturada */}
      <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(115,250,121,0.10) 100%)`, border: `1px solid rgba(115,250,121,0.3)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
              Captura da renegociação Playmaker × FIFA
            </div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 56, color: C.white, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 16 }}>
              {fmt.usdFull(savingsCaptured)}
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: C.white, lineHeight: 1.6, maxWidth: 760 }}>
              Economia direta gerada para a Cromotransfer pela renegociação que a Playmaker conduziu
              junto à FIFA, introduzindo taxa diferenciada de US$ 0.25 por unidade Ecoflex (vs US$ 0.45
              da estrutura anterior, equivalente à de TPU). Aplicada a partir de Q2 2025, a nova taxa
              já cobre <b>{fmt.unitsFull(savingsUnits)}</b> unidades vendidas e segue ativa em cada novo
              trimestre do FWC22, com economia média de <b>{fmt.usd(avgSavingsPerQ)} por trimestre</b> no
              ritmo de vendas atual. A janela anterior à renegociação (Q3 2023 a Q1 2025) acumulou
              {" "}<b>{fmt.usd(windowAmount)}</b> em royalties que poderiam ter sido evitados; valor
              potencialmente recuperável via diálogo formal com a FIFA Licensing.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 220 }}>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Já economizado</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.green, fontWeight: 700 }}>{fmt.usdFull(savingsCaptured)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 2 }}>{fmt.unitsFull(savingsUnits)} un. a 0.25</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Janela anterior</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 18, color: C.yellow, fontWeight: 700 }}>{fmt.usdFull(windowAmount)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 2 }}>{fmt.unitsFull(windowUnits)} un. a 0.45</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Captura líquida</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.white, fontWeight: 700 }}>{fmt.usdFull(netCapture)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 2 }}>{multiplier.toFixed(1)}x maior que a janela</div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE da economia, trimestre a trimestre */}
      <Section kicker="Linha do Tempo" title="Economia mensal capturada vs janela anterior">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={(() => {
              const map = {};
              fwc22Ecoflex.forEach((l) => {
                if (!map[l.quarter]) map[l.quarter] = { quarter: l.quarter, savings: 0, window_loss: 0, units_post: 0, units_pre: 0 };
                if (l.royalty_rate === 0.25) {
                  map[l.quarter].savings += l.units * 0.20;
                  map[l.quarter].units_post += l.units;
                } else if (l.royalty_rate === 0.45) {
                  map[l.quarter].window_loss += l.overpaid;
                  map[l.quarter].units_pre += l.units;
                }
              });
              const qSort = (q) => { const p = q.split(" "); return parseInt(p[1]) * 10 + parseInt(p[0].replace("Q", "")); };
              return Object.values(map).sort((a, b) => qSort(a.quarter) - qSort(b.quarter));
            })()}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
            <XAxis dataKey="quarter" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
            <YAxis tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.usd} />
            <Tooltip content={<ChartTooltip formatter={(v) => fmt.usdFull(v)} />} />
            <ReferenceLine x="Q2 2025" stroke={C.green} strokeDasharray="4 2" label={{ value: "Renegociação", position: "top", fill: C.green, fontSize: 10, fontFamily: FONT_HEAD }} />
            <Bar dataKey="window_loss" name="Janela anterior (a 0.45)" fill={C.yellow} radius={[2, 2, 0, 0]} />
            <Bar dataKey="savings" name="Economia capturada (a 0.25)" fill={C.green} radius={[2, 2, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </Section>

      {/* DETALHAMENTO trimestre a trimestre */}
      <Section kicker="Detalhamento" title="Trimestre por Trimestre">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: "8px 16px", fontFamily: FONT_BODY, fontSize: 11.5 }}>
          <HeaderCell>Trimestre</HeaderCell>
          <HeaderCell align="right">Unidades Ecoflex</HeaderCell>
          <HeaderCell align="right">Taxa aplicada</HeaderCell>
          <HeaderCell align="right">Royalty pago</HeaderCell>
          <HeaderCell align="right">Captura ou Janela</HeaderCell>
          {(() => {
            const map = {};
            fwc22Ecoflex.forEach((l) => {
              if (!map[l.quarter]) map[l.quarter] = { quarter: l.quarter, units: 0, royalty: 0, rate: l.royalty_rate, post: l.royalty_rate === 0.25 };
              map[l.quarter].units += l.units;
              map[l.quarter].royalty += l.royalty_amount_usd;
            });
            const qSort = (q) => { const p = q.split(" "); return parseInt(p[1]) * 10 + parseInt(p[0].replace("Q", "")); };
            const rows = Object.values(map).sort((a, b) => qSort(a.quarter) - qSort(b.quarter));
            return rows.map((q, i) => {
              const delta = q.post ? q.units * 0.20 : -(q.units * 0.20);
              return (
                <React.Fragment key={i}>
                  <Cell2>{q.quarter}</Cell2>
                  <Cell2 align="right" mono>{fmt.unitsFull(q.units)}</Cell2>
                  <Cell2 align="right" mono accent={q.post ? C.green : C.yellow}>${q.rate.toFixed(2)}</Cell2>
                  <Cell2 align="right" mono>{fmt.usdFull(q.royalty)}</Cell2>
                  <Cell2 align="right" mono accent={q.post ? C.green : C.yellow}>
                    {q.post ? "+" : "-"}{fmt.usdFull(Math.abs(delta))}
                  </Cell2>
                </React.Fragment>
              );
            });
          })()}
          <Cell2><b>TOTAL ECONOMIZADO</b></Cell2>
          <Cell2 align="right" mono><b>{fmt.unitsFull(savingsUnits)}</b></Cell2>
          <Cell2 align="right" mono accent={C.green}><b>$0.25</b></Cell2>
          <Cell2 align="right" mono><b>{fmt.usdFull(savingsUnits * 0.25)}</b></Cell2>
          <Cell2 align="right" mono accent={C.green}><b>+{fmt.usdFull(savingsCaptured)}</b></Cell2>
          <Cell2><b>JANELA ANTERIOR</b></Cell2>
          <Cell2 align="right" mono><b>{fmt.unitsFull(windowUnits)}</b></Cell2>
          <Cell2 align="right" mono accent={C.yellow}><b>$0.45</b></Cell2>
          <Cell2 align="right" mono><b>{fmt.usdFull(windowUnits * 0.45)}</b></Cell2>
          <Cell2 align="right" mono accent={C.yellow}><b>-{fmt.usdFull(windowAmount)}</b></Cell2>
        </div>

        <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(115,250,121,0.06)", border: `1px solid rgba(115,250,121,0.2)`, borderRadius: 8 }}>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
            Próximos passos
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.6 }}>
            (a) A partir do FWC26, todos os acordos FIFA passam a royalty percentual fixo de 20% sobre
            receita bruta, substituindo a estrutura de centavos por unidade. A captura conquistada no
            FWC22 já está consolidada para o ciclo restante até 2030. (b) Avaliar com Bernard e Artur
            Caminha se vale abrir conversa formal com Alessandro Villa sobre a janela anterior à
            renegociação, ponderando custo do diálogo vs valor potencialmente recuperável. (c) Continuar
            acompanhando a economia trimestral capturada até o encerramento do ciclo FWC22.
          </div>
        </div>
      </Section>

      {cycle === "ALL" && (() => {
        const tradeOffCycles = ["FWWC23", "FIC24"];
        const tradeOffData = tradeOffCycles.map((cyc) => {
          const ecoLines = data.lines.filter((l) => l.cycle === cyc && l.material === "Ecoflex");
          const units = ecoLines.reduce((a, l) => a + l.units, 0);
          const paid = ecoLines.reduce((a, l) => a + l.royalty_amount_usd, 0);
          const tradeOff = paid - units * 0.25;
          return { cyc, units, paid, tradeOff };
        }).filter((d) => d.units > 0);
        if (tradeOffData.length === 0) return null;
        const totalTradeOff = tradeOffData.reduce((a, d) => a + d.tradeOff, 0);
        const totalUnits = tradeOffData.reduce((a, d) => a + d.units, 0);
        return (
          <Section kicker="Outros ciclos" title="Trade-offs da renegociação não estendida" accent={C.yellow}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.6, marginBottom: 14 }}>
              Decisão consciente na época da renegociação Playmaker × FIFA: a estrutura diferenciada de
              royalty (Ecoflex 0.25 vs TPU 0.45) ficou restrita ao contrato 99313 (FWC22). Os contratos
              intermediários FWWC23 e FIC24 mantêm Ecoflex a 0.45. Total de {fmt.unitsFull(totalUnits)}
              {" "}unidades Ecoflex acumulando <b>{fmt.usdFull(totalTradeOff)}</b> de trade-off
              documentado. A partir do FWC26 a discussão deixa de ser relevante: novo modelo passa a
              royalty percentual fixo de 20% sobre receita.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
              {tradeOffData.map((d) => (
                <div key={d.cyc} style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.yellow}`, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontFamily: FONT_HEAD, fontSize: 13, color: C.yellow, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{d.cyc}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    <MiniStat label="Unidades" value={fmt.units(d.units)} small />
                    <MiniStat label="Pago a 0.45" value={fmt.usd(d.paid)} small />
                    <MiniStat label="Trade-off" value={fmt.usd(d.tradeOff)} accent={C.yellow} small />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        );
      })()}
    </div>
  );
};

const ProjecaoView = ({ data }) => {
  const ecoflexMat = data.materials.find((m) => m.material === "Ecoflex");
  const tpuMat = data.materials.find((m) => m.material === "TPU");
  const totalEcoflexUnits = ecoflexMat ? ecoflexMat.units : 0;
  const totalTpuUnits = tpuMat ? tpuMat.units : 0;
  const ecoflexAvgPrice = totalEcoflexUnits > 0 ? (ecoflexMat.gross / totalEcoflexUnits) : 1.12;
  const tpuAvgPrice = totalTpuUnits > 0 ? (tpuMat.gross / totalTpuUnits) : 1.9;
  const [growthEcoflex, setGrowthEcoflex] = useState(20);
  const [growthTpu, setGrowthTpu] = useState(40);
  const [priceEcoflex, setPriceEcoflex] = useState(ecoflexAvgPrice);
  const [priceTpu, setPriceTpu] = useState(tpuAvgPrice);

  // Recente price ranges como dica para FWC26
  const ecoflexPrices = data.lines.filter((l) => l.material === "Ecoflex").map((l) => l.unit_price_usd);
  const tpuPrices = data.lines.filter((l) => l.material === "TPU").map((l) => l.unit_price_usd);
  const ecoflexRange = ecoflexPrices.length > 0 ? [Math.min(...ecoflexPrices), Math.max(...ecoflexPrices)] : [0, 0];
  const tpuRange = tpuPrices.length > 0 ? [Math.min(...tpuPrices), Math.max(...tpuPrices)] : [0, 0];

  const projection = {
    ecoflex_units: Math.round(totalEcoflexUnits * (1 + growthEcoflex / 100)),
    tpu_units: Math.round(totalTpuUnits * (1 + growthTpu / 100)),
  };
  projection.gross = projection.ecoflex_units * priceEcoflex + projection.tpu_units * priceTpu;
  // FWC26 em diante: royalty percentual fixo de 20% sobre receita bruta
  projection.royalties = projection.gross * 0.20;
  const compareData = [
    { label: "Base atual", ecoflex: totalEcoflexUnits, tpu: totalTpuUnits },
    { label: "FWC26 projetado", ecoflex: projection.ecoflex_units, tpu: projection.tpu_units },
  ];
  return (
    <div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.purple}`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <Compass size={15} color={C.purple} style={{ marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.purple, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Como ler isso</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.5 }}>
              <b>Modelo do FWC26 em diante:</b> royalty percentual fixo de 20% sobre receita bruta,
              substituindo a estrutura de centavos por unidade dos contratos anteriores. Os controles
              de volume aplicam % de crescimento sobre a base atual (definida pelo filtro de ciclo no
              header) e os campos de preço permitem ajustar a estimativa por material para o FWC26 (os
              preços históricos variaram bastante entre ciclos: Ecoflex US$ 1.12 a US$ 2.10, TPU US$ 2.28
              a US$ 4.23). A projeção combina volume × preço × 20% pra calcular royalty FIFA esperado.
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Section kicker="Premissa" title="Ecoflex">
          <div style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Volume FWC26 vs base atual</div>
          <Slider value={growthEcoflex} min={-50} max={200} color={C.green} onChange={setGrowthEcoflex} suffix="%" />
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
            <MiniStat label="Base atual" value={fmt.units(totalEcoflexUnits)} small />
            <MiniStat label="FWC26 projetado" value={fmt.units(projection.ecoflex_units)} accent={C.green} small />
          </div>
          <div style={{ marginTop: 14 }}>
            <PriceInput label="Preço estimado FWC26" value={priceEcoflex} onChange={setPriceEcoflex} suggested={ecoflexAvgPrice} priceRange={ecoflexRange} color={C.green} />
          </div>
        </Section>
        <Section kicker="Premissa" title="TPU">
          <div style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Volume FWC26 vs base atual</div>
          <Slider value={growthTpu} min={-50} max={200} color={C.yellow} onChange={setGrowthTpu} suffix="%" />
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
            <MiniStat label="Base atual" value={fmt.units(totalTpuUnits)} small />
            <MiniStat label="FWC26 projetado" value={fmt.units(projection.tpu_units)} accent={C.yellow} small />
          </div>
          <div style={{ marginTop: 14 }}>
            <PriceInput label="Preço estimado FWC26" value={priceTpu} onChange={setPriceTpu} suggested={tpuAvgPrice} priceRange={tpuRange} color={C.yellow} />
          </div>
        </Section>
      </div>
      <Section kicker="Comparativo" title="Base atual vs FWC26 projetado">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
          <CompareCard label="Volume Total" current={totalEcoflexUnits + totalTpuUnits} projected={projection.ecoflex_units + projection.tpu_units} formatter={fmt.unitsFull} />
          <CompareCard label="Receita Bruta" current={data.kpis.total_gross} projected={projection.gross} formatter={fmt.usdFull} />
          <CompareCard label="Royalty FIFA" current={data.kpis.total_royalties} projected={projection.royalties} formatter={fmt.usdFull} negativeIsGood />
          <CompareCard label="Receita Liquida" current={data.kpis.total_gross - data.kpis.total_royalties} projected={projection.gross - projection.royalties} formatter={fmt.usdFull} />
        </div>
        <div style={{ marginTop: 16 }}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={compareData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: C.grey, fontSize: 11, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
              <YAxis tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.units} />
              <Tooltip content={<ChartTooltip formatter={(v) => fmt.unitsFull(v)} />} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONT_BODY, color: C.grey }} iconType="square" />
              <Bar dataKey="ecoflex" name="Ecoflex" fill={C.green} stackId="a" />
              <Bar dataKey="tpu" name="TPU" fill={C.yellow} stackId="a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </div>
  );
};

const Slider = ({ value, min, max, onChange, color, suffix = "" }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em" }}>{min}{suffix} ... {max}{suffix}</span>
      <span style={{ fontFamily: FONT_HEAD, fontSize: 18, color, fontWeight: 700 }}>{value > 0 ? "+" : ""}{value}{suffix}</span>
    </div>
    <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(parseInt(e.target.value))} style={{ width: "100%", accentColor: color, cursor: "pointer" }} />
  </div>
);

const PriceInput = ({ label, value, onChange, suggested, priceRange, color }) => {
  const isModified = Math.abs(value - suggested) > 0.005;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "baseline" }}>
        <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700 }}>
          {label}
        </span>
        {isModified && (
          <button
            onClick={() => onChange(suggested)}
            style={{ background: "transparent", border: `1px solid ${C.borderMid}`, borderRadius: 4, padding: "2px 8px", color: C.grey, fontFamily: FONT_HEAD, fontSize: 9, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            Resetar (${suggested.toFixed(2)})
          </button>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: C.grey, fontSize: 16, fontFamily: FONT_HEAD, fontWeight: 700 }}>$</span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={value.toFixed(2)}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          style={{
            flex: 1,
            padding: "8px 12px",
            background: C.bg,
            border: `1px solid ${isModified ? color : C.borderMid}`,
            borderRadius: 6,
            color: color,
            fontFamily: FONT_HEAD,
            fontSize: 18,
            fontWeight: 700,
            outline: "none",
            transition: "border-color 0.15s ease",
          }}
        />
        <span style={{ color: C.grey, fontSize: 11, fontFamily: FONT_BODY }}>/un.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey }}>
        <span>Sugerido (média base): ${suggested.toFixed(2)}</span>
        {priceRange && priceRange[1] > 0 && (
          <span>Faixa observada: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

const CompareCard = ({ label, current, projected, formatter, negativeIsGood }) => {
  const delta = projected - current;
  const pct = current > 0 ? (delta / current) * 100 : 0;
  const isPositive = negativeIsGood ? delta < 0 : delta > 0;
  const color = isPositive ? C.green : C.red;
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 10, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginBottom: 2 }}>Base {formatter(current)}</div>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 16, color: C.white, fontWeight: 700, marginBottom: 4 }}>{formatter(projected)}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 11, color, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
        {delta > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {pct > 0 ? "+" : ""}{pct.toFixed(1)}%
      </div>
    </div>
  );
};

const RegistrosView = ({ data }) => {
  const [filterRef, setFilterRef] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCycle, setFilterCycle] = useState("");
  const [filterLeaked, setFilterLeaked] = useState(false);
  const filtered = data.lines.filter((l) => {
    if (filterRef && l.product_ref !== filterRef) return false;
    if (filterCountry && l.country !== filterCountry) return false;
    if (filterCycle && l.cycle !== filterCycle) return false;
    if (filterLeaked && !l.leaked) return false;
    return true;
  });
  const refs = [...new Set(data.lines.map((l) => l.product_ref))];
  const countries = [...new Set(data.lines.map((l) => l.country))].sort();
  const cycles = [...new Set(data.lines.map((l) => l.cycle))].sort();
  return (
    <Section kicker={filtered.length + " registros"} title="Linha a linha">
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <FilterSelect label="Ciclo" value={filterCycle} onChange={setFilterCycle} options={[{ v: "", l: "Todos" }, ...cycles.map((c) => ({ v: c, l: c }))]} />
        <FilterSelect label="Product Ref" value={filterRef} onChange={setFilterRef} options={[{ v: "", l: "Todos" }, ...refs.map((r) => ({ v: r, l: r }))]} />
        <FilterSelect label="País" value={filterCountry} onChange={setFilterCountry} options={[{ v: "", l: "Todos" }, ...countries.map((c) => ({ v: c, l: c }))]} />
        <button onClick={() => setFilterLeaked(!filterLeaked)} style={{ padding: "6px 12px", borderRadius: 6, background: filterLeaked ? "rgba(255,92,92,0.15)" : "transparent", border: `1px solid ${filterLeaked ? C.red : C.borderMid}`, color: filterLeaked ? C.red : C.grey, fontFamily: FONT_HEAD, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <AlertCircle size={11} />
          Só com leak
        </button>
      </div>
      <div style={{ overflowX: "auto", maxHeight: 480, overflowY: "auto" }}>
        <table style={{ width: "100%", fontFamily: FONT_BODY, fontSize: 11, borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, background: C.card, zIndex: 1 }}>
            <tr>
              {["Ciclo", "Trimestre", "Mes", "Ref", "Material", "Territorio", "Canal", "Preco", "Unidades", "Royalty", "Pago a mais"].map((h, i) => (
                <th key={i} style={{ fontFamily: FONT_HEAD, fontSize: 9.5, color: C.grey, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, textAlign: i >= 7 ? "right" : "left", padding: "8px 10px", borderBottom: `1px solid ${C.borderMid}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => {
              const cycColor = CYCLE_COLOR[l.cycle] || C.grey;
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: l.leaked ? "rgba(255,92,92,0.04)" : "transparent" }}>
                  <td style={{ padding: "6px 10px" }}>
                    <span style={{ fontFamily: FONT_HEAD, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: cycColor, padding: "2px 6px", borderRadius: 3, border: `1px solid ${cycColor}40`, textTransform: "uppercase" }}>{l.cycle}</span>
                  </td>
                  <td style={{ padding: "6px 10px", color: C.white }}>{l.quarter}</td>
                  <td style={{ padding: "6px 10px", color: C.grey }}>{l.month}</td>
                  <td style={{ padding: "6px 10px", color: C.white, fontFamily: FONT_HEAD, fontWeight: 600 }}>{l.product_ref}</td>
                  <td style={{ padding: "6px 10px" }}>
                    <span style={{ fontFamily: FONT_HEAD, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: l.material === "Ecoflex" ? C.green : C.yellow, fontWeight: 700 }}>{l.material}</span>
                  </td>
                  <td style={{ padding: "6px 10px", color: C.white }}>{l.territory}</td>
                  <td style={{ padding: "6px 10px", color: C.grey }}>{l.channel}</td>
                  <td style={{ padding: "6px 10px", color: C.white, textAlign: "right", fontFamily: FONT_HEAD }}>${l.unit_price_usd.toFixed(2)}</td>
                  <td style={{ padding: "6px 10px", color: C.white, textAlign: "right", fontFamily: FONT_HEAD, fontWeight: 600 }}>{l.units.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "6px 10px", textAlign: "right", fontFamily: FONT_HEAD, color: l.royalty_rate === l.correct_rate ? C.green : C.red, fontWeight: 600 }}>${l.royalty_rate.toFixed(2)}</td>
                  <td style={{ padding: "6px 10px", textAlign: "right", fontFamily: FONT_HEAD, color: l.leaked ? C.red : C.grey, fontWeight: l.leaked ? 700 : 400 }}>
                    {l.leaked ? "$" + l.overpaid.toFixed(2) : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

const FilterSelect = ({ label, value, onChange, options }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.06em", color: C.grey, textTransform: "uppercase", fontWeight: 700 }}>{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, background: C.bg, border: `1px solid ${C.borderMid}`, color: C.white, fontFamily: FONT_BODY, fontSize: 11.5, cursor: "pointer" }}>
      {options.map((o, i) => (<option key={i} value={o.v}>{o.l}</option>))}
    </select>
  </div>
);

const CycleSelector = ({ value, onChange }) => {
  const options = [
    { v: "ALL", l: "Todos os ciclos", enabled: true },
    { v: "FWC22", l: "FWC22 - Contract 99313", enabled: true },
    { v: "FWWC23", l: "FWWC23 - Contract 105215", enabled: true },
    { v: "FIC24", l: "FIC24 - Contract 40005352", enabled: true },
    { v: "FCWC25", l: "FCWC25 - Contract 40005390", enabled: true },
    { v: "FIC25", l: "FIC25 - Contract 40005890", enabled: true },
    { v: "FWC26", l: "FWC26 - futuro (20% percentual)", enabled: false },
  ];
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ padding: "6px 12px", borderRadius: 6, background: C.bg, border: `1px solid ${C.borderMid}`, color: C.white, fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", cursor: "pointer" }}>
      {options.map((o, i) => (<option key={i} value={o.v} disabled={!o.enabled}>{o.l}</option>))}
    </select>
  );
};

const COMMISSION_RATE = 0.05;

// =================================================================
// COMMISSION VIEW (Playmaker-only)
// Em produção, esta aba é gateada por middleware (admin role).
// =================================================================
const CommissionView = () => {
  // Histórico: 5% sobre todo o gross realizado
  const totalGross = DATA.kpis_total.total_gross;
  const totalCommissionRealized = totalGross * COMMISSION_RATE;

  // Por ciclo
  const perCycle = Object.entries(DATA.cycles).map(([cyc, info]) => ({
    cycle: cyc,
    contract: info.contract,
    period: info.period,
    units: info.total_units,
    gross: info.total_gross,
    commission: info.total_gross * COMMISSION_RATE,
  })).sort((a, b) => b.commission - a.commission);

  // Por trimestre histórico
  const perQuarter = DATA.quarters.map((q) => ({
    quarter: q.quarter,
    gross: q.gross,
    commission: q.gross * COMMISSION_RATE,
  }));

  // Base FWC26 = FWC22 (ciclo equivalente anterior)
  const fwc22Lines = DATA.lines.filter((l) => l.cycle === "FWC22");
  const fwc22EcoflexLines = fwc22Lines.filter((l) => l.material === "Ecoflex");
  const fwc22TpuLines = fwc22Lines.filter((l) => l.material === "TPU");
  const baseEcoflexUnits = fwc22EcoflexLines.reduce((a, l) => a + l.units, 0);
  const baseTpuUnits = fwc22TpuLines.reduce((a, l) => a + l.units, 0);
  const baseEcoflexGross = fwc22EcoflexLines.reduce((a, l) => a + l.gross_sales_usd, 0);
  const baseTpuGross = fwc22TpuLines.reduce((a, l) => a + l.gross_sales_usd, 0);
  const baseEcoflexAvgPrice = baseEcoflexUnits > 0 ? baseEcoflexGross / baseEcoflexUnits : 1.28;
  const baseTpuAvgPrice = baseTpuUnits > 0 ? baseTpuGross / baseTpuUnits : 1.85;

  // Faixas de preço observadas (todos os ciclos, pra orientação)
  const ecoflexAllPrices = DATA.lines.filter((l) => l.material === "Ecoflex").map((l) => l.unit_price_usd);
  const tpuAllPrices = DATA.lines.filter((l) => l.material === "TPU").map((l) => l.unit_price_usd);
  const ecoflexRange = ecoflexAllPrices.length > 0 ? [Math.min(...ecoflexAllPrices), Math.max(...ecoflexAllPrices)] : [0, 0];
  const tpuRange = tpuAllPrices.length > 0 ? [Math.min(...tpuAllPrices), Math.max(...tpuAllPrices)] : [0, 0];

  // State da projeção FWC26 (independente da aba Projeção)
  const [growthEcoflex, setGrowthEcoflex] = useState(20);
  const [growthTpu, setGrowthTpu] = useState(40);
  const [priceEcoflex, setPriceEcoflex] = useState(baseEcoflexAvgPrice);
  const [priceTpu, setPriceTpu] = useState(baseTpuAvgPrice);

  const projUnits = {
    ecoflex: Math.round(baseEcoflexUnits * (1 + growthEcoflex / 100)),
    tpu: Math.round(baseTpuUnits * (1 + growthTpu / 100)),
  };
  const projGross = projUnits.ecoflex * priceEcoflex + projUnits.tpu * priceTpu;
  const projCommission = projGross * COMMISSION_RATE;

  // Padrão FWC22 trimestre a trimestre (% sobre gross do ciclo)
  const fwc22ByQ = {};
  fwc22Lines.forEach((l) => {
    if (!fwc22ByQ[l.quarter]) fwc22ByQ[l.quarter] = 0;
    fwc22ByQ[l.quarter] += l.gross_sales_usd;
  });
  const fwc22TotalGross = Object.values(fwc22ByQ).reduce((a, b) => a + b, 0);

  const qSort = (q) => {
    const parts = q.split(" ");
    return parseInt(parts[1]) * 4 + parseInt(parts[0].replace("Q", ""));
  };

  // Shift de 15 trimestres: FWC22 final = Q4/2022, FWC26 final = Q3/2026
  // Q1/2023 (T+1 FWC22) → Q4/2026 (T+1 FWC26)
  const FWC22_TO_FWC26_OFFSET = 15;
  const shiftQuarter = (q, offset) => {
    const parts = q.split(" ");
    const qNum = parseInt(parts[0].replace("Q", ""));
    const yNum = parseInt(parts[1]);
    const totalQ = yNum * 4 + qNum + offset;
    const newY = Math.floor((totalQ - 1) / 4);
    const newQ = ((totalQ - 1) % 4) + 1;
    return "Q" + newQ + " " + newY;
  };

  const fwc22Distribution = Object.entries(fwc22ByQ)
    .map(([q, gross]) => ({ quarter: q, pct: gross / fwc22TotalGross }))
    .sort((a, b) => qSort(a.quarter) - qSort(b.quarter));

  let cumulative = 0;
  const fwc26CashFlow = fwc22Distribution.map((d) => {
    const commission = d.pct * projCommission;
    cumulative += commission;
    return {
      quarter: shiftQuarter(d.quarter, FWC22_TO_FWC26_OFFSET),
      pct: d.pct,
      gross: d.pct * projGross,
      commission,
      cumulative,
    };
  });

  // Pico esperado
  const peakQuarter = fwc26CashFlow.reduce((max, q) => (q.commission > max.commission ? q : max), fwc26CashFlow[0]);

  return (
    <div>
      {/* Notice: admin only */}
      <div style={{ background: C.card, border: `1px solid ${C.borderMid}`, borderLeft: `3px solid ${C.purple}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <Lock size={14} color={C.purple} />
        <div style={{ fontFamily: FONT_BODY, fontSize: 11.5, color: C.grey }}>
          <span style={{ fontFamily: FONT_HEAD, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", color: C.purple, textTransform: "uppercase", marginRight: 8 }}>Restrito Playmaker</span>
          Visão de comissão (5% sobre receita bruta) não compartilhada com o time Cromotransfer.
        </div>
      </div>

      {/* Hero: comissão total */}
      <div style={{ background: `linear-gradient(135deg, ${C.card} 0%, rgba(115,250,121,0.10) 100%)`, border: `1px solid rgba(115,250,121,0.3)`, borderRadius: 12, padding: "24px 28px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
              Comissão Playmaker total estimada
            </div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 56, color: C.white, fontWeight: 700, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 16 }}>
              {fmt.usdFull(totalCommissionRealized + projCommission)}
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: C.white, lineHeight: 1.6, maxWidth: 720 }}>
              Soma da comissão já realizada (5% sobre {fmt.usd(totalGross)} de receita bruta dos 5 contratos
              FIFA da Cromotransfer entre Q1 2023 e Q1 2026) e da comissão projetada para o ciclo FWC26
              com base nas premissas abaixo. Use os controles na seção Projeção para ajustar volume e
              preço por material e ver o impacto direto no cash flow estimado.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 220 }}>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Já realizado</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.green, fontWeight: 700 }}>{fmt.usdFull(totalCommissionRealized)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 2 }}>Q1 2023 - Q1 2026</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10, color: C.grey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>FWC26 projetado</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.purple, fontWeight: 700 }}>{fmt.usdFull(projCommission)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginTop: 2 }}>Q4 2026 em diante</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: HISTÓRICO */}
      <Section kicker="Histórico" title="5% sobre receita bruta - já realizado por ciclo">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 18 }}>
          {perCycle.map((c) => {
            const color = CYCLE_COLOR[c.cycle] || C.green;
            return (
              <div key={c.cycle} style={{ background: C.bg, border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`, borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 12, color: color, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{c.cycle}</div>
                <div style={{ fontFamily: FONT_HEAD, fontSize: 18, color: C.white, fontWeight: 700, marginBottom: 2 }}>{fmt.usd(c.commission)}</div>
                <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey }}>5% × {fmt.usd(c.gross)}</div>
              </div>
            );
          })}
        </div>

        <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Comissão trimestre a trimestre</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={perQuarter} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
            <XAxis dataKey="quarter" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
            <YAxis tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.usd} />
            <Tooltip content={<ChartTooltip formatter={(v) => fmt.usdFull(v)} />} />
            <Bar dataKey="commission" name="Comissão (5%)" fill={C.green} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* SECTION: PROJEÇÃO FWC26 */}
      <Section kicker="Projeção FWC26" title="Premissas para o próximo ciclo">
        <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.6, marginBottom: 14, padding: "10px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6 }}>
          Base de cálculo: <b>FWC22</b> ({fmt.unitsFull(baseEcoflexUnits)} un. Ecoflex e {fmt.unitsFull(baseTpuUnits)} un. TPU). Os controles abaixo aplicam % de crescimento e ajustam o preço estimado por material para o FWC26.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Ecoflex</div>
            <Slider value={growthEcoflex} min={-50} max={300} color={C.green} onChange={setGrowthEcoflex} suffix="%" />
            <div style={{ marginTop: 10, paddingBottom: 14, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <MiniStat label="Base FWC22" value={fmt.units(baseEcoflexUnits)} small />
              <MiniStat label="FWC26 projetado" value={fmt.units(projUnits.ecoflex)} accent={C.green} small />
            </div>
            <div style={{ marginTop: 12 }}>
              <PriceInput label="Preço estimado FWC26" value={priceEcoflex} onChange={setPriceEcoflex} suggested={baseEcoflexAvgPrice} priceRange={ecoflexRange} color={C.green} />
            </div>
          </div>
          <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.10em", color: C.yellow, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>TPU</div>
            <Slider value={growthTpu} min={-50} max={300} color={C.yellow} onChange={setGrowthTpu} suffix="%" />
            <div style={{ marginTop: 10, paddingBottom: 14, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <MiniStat label="Base FWC22" value={fmt.units(baseTpuUnits)} small />
              <MiniStat label="FWC26 projetado" value={fmt.units(projUnits.tpu)} accent={C.yellow} small />
            </div>
            <div style={{ marginTop: 12 }}>
              <PriceInput label="Preço estimado FWC26" value={priceTpu} onChange={setPriceTpu} suggested={baseTpuAvgPrice} priceRange={tpuRange} color={C.yellow} />
            </div>
          </div>
        </div>

        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Volume FWC26 projetado</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.white, fontWeight: 700 }}>{fmt.unitsFull(projUnits.ecoflex + projUnits.tpu)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginTop: 3 }}>Ecoflex {fmt.units(projUnits.ecoflex)} + TPU {fmt.units(projUnits.tpu)}</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Receita bruta projetada</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.white, fontWeight: 700 }}>{fmt.usdFull(projGross)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginTop: 3 }}>Volume × preços projetados</div>
            </div>
            <div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 10.5, letterSpacing: "0.08em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Comissão Playmaker (5%)</div>
              <div style={{ fontFamily: FONT_HEAD, fontSize: 22, color: C.green, fontWeight: 700 }}>{fmt.usdFull(projCommission)}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginTop: 3 }}>Total esperado FWC26</div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION: CASH FLOW */}
      <Section kicker="Cash Flow" title="Distribuição estimada FWC26 ao longo dos trimestres">
        <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.yellow}`, borderRadius: 8, padding: "12px 14px", marginBottom: 16, fontFamily: FONT_BODY, fontSize: 12.5, color: C.white, lineHeight: 1.5 }}>
            <b style={{ color: C.yellow }}>Premissa:</b> distribuição calculada a partir do padrão real do FWC22 (% de
            receita por trimestre) deslocado em 15 trimestres pra alinhar com o ciclo FWC26 (final em
            Q3 2026, primeiro trimestre de cash flow projetado em Q4 2026). O FWC22 teve pico atípico em
            Q2 2025 dirigido pela demanda adidas/Argentina FWC26, que se traduz aqui como pico em <b>{peakQuarter ? peakQuarter.quarter : "Q1 2029"}</b>
            {" "}({peakQuarter ? fmt.pct(peakQuarter.pct * 100) : "47%"} do total). Esta é uma simulação; o padrão real do FWC26 vai depender do
            campeão, da estratégia adidas e do comportamento dos distribuidores.
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={fwc26CashFlow} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.steel} vertical={false} />
            <XAxis dataKey="quarter" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={{ stroke: C.steel }} />
            <YAxis yAxisId="left" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.usd} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: C.grey, fontSize: 10, fontFamily: FONT_BODY }} tickLine={false} axisLine={false} tickFormatter={fmt.usd} />
            <Tooltip content={<ChartTooltip formatter={(v) => fmt.usdFull(v)} />} />
            <Bar yAxisId="left" dataKey="commission" name="Comissão por trimestre" fill={C.green} radius={[2, 2, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Acumulado" stroke={C.purple} strokeWidth={2.5} dot={{ r: 3, fill: C.purple }} />
          </ComposedChart>
        </ResponsiveContainer>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr auto auto auto auto", gap: "8px 16px", fontFamily: FONT_BODY, fontSize: 11.5 }}>
          <HeaderCell>Trimestre</HeaderCell>
          <HeaderCell align="right">% do total</HeaderCell>
          <HeaderCell align="right">Receita projetada</HeaderCell>
          <HeaderCell align="right">Comissão (5%)</HeaderCell>
          <HeaderCell align="right">Acumulado</HeaderCell>
          {fwc26CashFlow.map((q, i) => {
            const isPeak = q.quarter === peakQuarter.quarter;
            return (
              <React.Fragment key={i}>
                <Cell2 accent={isPeak ? C.yellow : C.white}>
                  {q.quarter}
                  {isPeak && <span style={{ marginLeft: 8, fontFamily: FONT_HEAD, fontSize: 9, color: C.yellow, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>pico</span>}
                </Cell2>
                <Cell2 align="right" mono>{fmt.pct(q.pct * 100)}</Cell2>
                <Cell2 align="right" mono>{fmt.usdFull(q.gross)}</Cell2>
                <Cell2 align="right" mono accent={C.green}>{fmt.usdFull(q.commission)}</Cell2>
                <Cell2 align="right" mono accent={C.purple}>{fmt.usdFull(q.cumulative)}</Cell2>
              </React.Fragment>
            );
          })}
          <Cell2><b>TOTAL</b></Cell2>
          <Cell2 align="right" mono><b>100.0%</b></Cell2>
          <Cell2 align="right" mono><b>{fmt.usdFull(projGross)}</b></Cell2>
          <Cell2 align="right" mono accent={C.green}><b>{fmt.usdFull(projCommission)}</b></Cell2>
          <Cell2 align="right" mono accent={C.purple}><b>{fmt.usdFull(projCommission)}</b></Cell2>
        </div>
      </Section>
    </div>
  );
};

export default function ChampionsBadgeDashboard({ role } = {}) {
  const [activeTab, setActiveTab] = useState("visao");
  const [cycle, setCycle] = useState("ALL");
  // ADMIN GATE: role vem do middleware via header x-dashfifa-role.
  // - role === undefined: chat preview / dev (mostra a aba)
  // - role === "cromo": Cromotransfer (esconde a aba)
  // - role === "playmaker": Playmaker (mostra a aba)
  // - role === null: middleware não setou (esconde por segurança)
  const [showCommission, setShowCommission] = useState(role === "playmaker" || typeof role === "undefined");
  const [isExporting, setIsExporting] = useState(false);

  // Exportar a visão atual como PDF usando html2canvas + jsPDF (com fallback pra window.print)
  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    const tabLabel = tabs.find((t) => t.id === activeTab)?.label || "dashboard";
    const filename = `dashfifa-${tabLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`;

    try {
      // Dynamic imports: funcionam no deploy (Vercel) onde html2canvas e jspdf estão no package.json.
      // No preview do chat essas libs não estão disponíveis e cai no fallback.
      const [h2cMod, jsPDFMod] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const html2canvas = h2cMod.default;
      const jsPDF = jsPDFMod.jsPDF || jsPDFMod.default;

      const element = document.querySelector("[data-export-root]");
      if (!element) throw new Error("export root not found");

      // Aguarda gráficos do recharts terminarem de renderizar
      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(element, {
        backgroundColor: "#171917",
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 595.28; // A4 em pt
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: pdfHeight > pdfWidth ? "portrait" : "landscape",
        unit: "pt",
        format: pdfHeight > pdfWidth ? "a4" : [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
    } catch (err) {
      console.warn("html2canvas/jspdf indisponível, tentando window.print()", err);
      try {
        window.print();
      } catch (printErr) {
        alert("Não foi possível exportar o PDF automaticamente. Use Cmd+P (Mac) ou Ctrl+P (Windows) pra imprimir como PDF.");
      }
    } finally {
      setIsExporting(false);
    }
  };
  const data = useFiltered(cycle);
  const tabs = [
    { id: "visao", label: "Visão Geral", icon: Activity, accent: C.green },
    { id: "skus", label: "SKUs", count: data.skus.length, icon: Package, accent: C.green },
    { id: "geo", label: "Geografia", count: data.countries.length, icon: Globe, accent: C.green },
    { id: "audit", label: "Auditoria", count: data.kpis.total_overpaid > 0.01 ? 1 : 0, icon: AlertTriangle, accent: data.kpis.total_overpaid > 0.01 ? C.red : C.green },
    { id: "proj", label: "Projeção FWC26", icon: Target, accent: C.purple },
    { id: "regs", label: "Registros", count: data.lines.length, icon: Layers, accent: C.green },
    ...(showCommission ? [{ id: "comm", label: "Acesso Restrito", icon: Lock, accent: C.purple, restricted: true }] : []),
  ];
  const cycleLabel = cycle === "ALL" ? "Todos os ciclos" : (CYCLE_LABEL[cycle] || cycle);
  return (
    <div data-export-root style={{ background: C.bg, minHeight: "100vh", padding: "20px 24px", fontFamily: FONT_BODY, color: C.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        body, html { background: ${C.bg}; }

        @media print {
          @page { size: A4; margin: 12mm; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body, html {
            background: ${C.bg} !important;
          }
          [data-print-hide] {
            display: none !important;
          }
          [data-print-only] {
            display: block !important;
          }
          /* Evita quebras feias dentro de seções */
          [class*="recharts-wrapper"], svg {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 18, marginBottom: 18, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <PlaymakerLogo height={26} />
          <div style={{ width: 1, height: 28, background: C.steel }} />
          <div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 17, fontWeight: 700, color: C.white, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
              Champions Badge<span style={{ color: C.green }}> · </span>Sales Tracker
            </div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 11, color: C.grey, marginTop: 2 }}>Cromotransfer · {cycleLabel}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} data-print-hide>
          <CycleSelector value={cycle} onChange={setCycle} />
          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{ padding: "6px 12px", borderRadius: 6, background: C.bg, border: `1px solid ${C.borderMid}`, color: isExporting ? C.grey : C.white, fontFamily: FONT_HEAD, fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", cursor: isExporting ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s ease", opacity: isExporting ? 0.7 : 1 }}
            onMouseEnter={(e) => { if (!isExporting) { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; } }}
            onMouseLeave={(e) => { if (!isExporting) { e.currentTarget.style.borderColor = C.borderMid; e.currentTarget.style.color = C.white; } }}
            title="Exportar visão atual em PDF"
          >
            <Download size={12} />
            {isExporting ? "Gerando..." : "Exportar PDF"}
          </button>
          <div style={{ fontFamily: FONT_HEAD, fontSize: 9.5, letterSpacing: "0.08em", color: C.grey, textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${C.border}`, borderRadius: 12 }}>v2 · {DATA.meta.last_updated}</div>
        </div>
      </div>
      {/* Print-only: mostra a aba ativa quando exporta */}
      <div data-print-only style={{ display: "none" }}>
        <div style={{ fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: "0.10em", color: C.green, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>
          {tabs.find((t) => t.id === activeTab)?.label || ""}
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey, marginBottom: 14 }}>
          Exportado em {new Date().toLocaleDateString("pt-BR")} · Cromotransfer x Champions Badge
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 18 }}>
        <KpiCard icon={Package} label="Volume Total" value={fmt.units(data.kpis.total_units)} sub={data.skus.length + " SKU(s) · " + data.lines.length + " linhas"} accent={C.white} />
        <KpiCard icon={DollarSign} label="Receita Bruta" value={fmt.usd(data.kpis.total_gross)} sub="Wholesale a distribuidores" accent={C.green} />
        <KpiCard icon={Activity} label="Royalty Pago FIFA" value={fmt.usd(data.kpis.total_royalties)} sub={data.kpis.total_gross > 0 ? fmt.pct((data.kpis.total_royalties / data.kpis.total_gross) * 100) + " da receita" : ""} accent={C.white} />
        <KpiCard icon={TrendingUp} label="Receita Liquida" value={fmt.usd(data.kpis.net_revenue)} sub="Após royalties" accent={C.green} />
        <KpiCard icon={CheckCircle2} label="Renegociação Royalties" value={(() => { const post = DATA.lines.filter(l => l.cycle === "FWC22" && l.material === "Ecoflex" && l.royalty_rate === 0.25); const sav = post.reduce((a,l) => a + l.units * 0.20, 0); return sav > 0 ? fmt.usd(sav) : "-"; })()} sub={(() => { const post = DATA.lines.filter(l => l.cycle === "FWC22" && l.material === "Ecoflex" && l.royalty_rate === 0.25); const u = post.reduce((a,l) => a + l.units, 0); return u > 0 ? fmt.units(u) + " un. a 0.25 (renegociação)" : "Sem renegociação no escopo"; })()} accent={C.green} onClick={() => setActiveTab("audit")} />
        <KpiCard icon={Globe} label="Cobertura" value={data.countries.length + " paises"} sub={data.channels.length + " canal(is) · " + data.quarters.length + " trimestres"} accent={C.white} />
      </div>
      <div data-print-hide style={{ display: "flex", gap: 4, marginBottom: 18, padding: "4px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflowX: "auto" }}>
        {tabs.map((t) => (
          <TabButton key={t.id} active={activeTab === t.id} onClick={() => setActiveTab(t.id)} count={t.count} icon={t.icon} accent={t.accent}>{t.label}</TabButton>
        ))}
      </div>
      {activeTab === "visao" && <VisaoGeral data={data} cycle={cycle} />}
      {activeTab === "skus" && <SKUsView data={data} cycle={cycle} />}
      {activeTab === "geo" && <GeografiaView data={data} />}
      {activeTab === "audit" && <AuditoriaView data={data} cycle={cycle} />}
      {activeTab === "proj" && <ProjecaoView data={data} />}
      {activeTab === "regs" && <RegistrosView data={data} />}
      {activeTab === "comm" && showCommission && <CommissionView />}
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontFamily: FONT_BODY, fontSize: 10.5, color: C.grey }}>
        <span>Sports for Brands. <span style={{ color: C.green }}>·</span> Playmaker</span>
        <span>{DATA.lines.length} linhas · {DATA.meta.cycles_loaded.length} ciclo(s) ativo(s) · Brand Comply exports</span>
      </div>
    </div>
  );
}
