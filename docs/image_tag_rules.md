Technical Document

# 信息库
信息库在本地以表格形式汇总，上传至腾讯云数据库后台进行更新。

表格结构稳定，共计33列，名称序号从0-32。首列为数据主列。后续根据使用需求在第32列后陆续增加列，表格目前共计1485行，后续根据需求增加行。以下具体说明每列作用：

-  **0Name**		球场英文名

    具有唯一性，起到全局识别的作用，也是连接图片与数据的桥梁，需要提供精确搜索、模糊搜索功能，需要根据英文名提供本球场的其他信息。

-  **1ChineseName**  球场中文名，存在空值、会出现个别重名的情况，需要提供精确搜索、模糊搜索功能。

-  **2Category**  球场的等级与赛事标记

    可以以组合的方式出现；存在空值、重复出现的情况。对应前端信息标签—基本信息—球场等级，共包含**6**个等级标记，**5**个赛事标记:

    **球场等级：**

            A 杰出

            B 优秀

            N 常规

            S 欠佳

            T 简陋

            H 历史

    **赛事标记：**

        U 欧足联认证球场：U4欧足联四类球场，U3欧足联三类球场，U2欧足联二类球场

        R 举办过洲际比赛的球场

        W 举办世界杯的球场，W1世界杯主赛场，W2半决赛球场，W3小组赛球场

        O或O1 举办过奥运会的球场

        C1国家体育场

-  **3Link**		为收集资料用，在筛选、搜索逻辑中不做任何处理，可忽略。

-  **4Built**		球场的建成时间，存在空值的情况。需要额外提供时间跨度的区间，例：2000—2010年。对应前端信息标签—基本信息—建造时间

-  **5Update**		球场更新或拆除时间，数字上有横线的（~~2003~~）代表拆除时间，存在空值的情况。

- **6Region**		球场所在的大洲，需要有筛选和搜索功能，对应[**前端信息标签—地区—洲际**]

- **7Country**	球场所在的国家，需要与大洲联动

- **8City**		球场所在的城市，需要与国家联动

- **9Architect**	球场建筑师，存在空值、重复的情况，多个设计师之间以“/”为分割符。

- **10Type**		球场的类型编码，存在空值的情况。对应前端[**信息标签—基本信息—球场类型**]

    |A 田径场|B 棒球场|C 板球场|
    | - | - | - |
    |F 足球场|R 英式橄榄球场|af 美式橄榄球场|
    |K 篮球|H 手球|S 滑冰|
    |Y 冰球|Z 综合|T 网球|
    |D 冰蓝转换|E 电竞|G 室内足球|

- **11Stand Contour**  球场看台类型编码

- **12GATier**	观众看台的层数，对应前端信息[**标签—看台选型—看台层数**]

- **13Capacity**  球场总座席数，与4Built同理，需要额外提供跨度的区间，例：20000—55000，对应前端[**信息标签—基本信息—总座席数**]

- **14R1**		低区看台排数，不做任何处理，可忽略。

- **15R2**		中区看台排数，不做任何处理，可忽略。

- **16R3**		高区看台排数，不做任何处理，可忽略。

- **17VIP**		球场的VIP座席数，存在空值的情况，无需提供搜索、筛选，仅根据其他搜索、筛选结果的配套信息展示。

- **18Hospitality**球场的高档座席数，存在空值的情况，无需提供搜索、筛选，仅根据其他搜索、筛选结果的套信息展示。

- **19Press**	球场的媒体座席数，存在空值的情况，无需提供搜索、筛选，仅根据其他搜索、筛选结果的配套信息展示。

- **20Disabled**  球场的残疾人座席数，存在空值的情况，无需提供搜索、筛选，仅根据其他搜索、筛选结果的配套信息展示。

- **21Suites**		球场的包厢数，存在空值的情况，无需提供搜索、筛选，仅根据其他搜索、筛选结果的配套信息展示。

- **22Others**		球场的其他信息，存在空值的情况，无需提供搜索、筛选，仅当存在“VVIP”字样时作为配套信息展示（表示VVIP的座席数）。

- **23Height**	球场的建筑高度，暂不做任何处理，后续可能会作为配套信息展示或筛选、搜索。

- **24FOP**		球场的场地情况，暂不做任何处理，后续可能会作为配套信息展示或筛选、搜索。

- **25Screen**		球场的大屏幕的尺寸，暂不做任何处理，后续可能会作为配套信息展示或筛选、搜索。

- **26Event / Club**	赛事与俱乐部

    存在空值的情况，需要提供搜索和筛选功能。需要提供举办年、赛事名拆开搜索、筛选的功能。例：用户可以仅筛选世界杯，结果呈现出历届世界的球场，不局限在某一年。

    赛事命名以“年份 赛事名”为格式，不同赛事或俱乐部之间以”/”分割，例：1998 World Cup/2020 EURO。某球场在不同年份举办同一赛事，格式规则为[年份1,年份2,年份3] 赛事名。例：[1976,1980,2022] World Cup。赛事命名如下：

    |国际赛事|||||
    | - | :- | :- | :- | :- |
    |<p>World Cup</p><p>世界杯</p>|<p>EURO (UEFA European Football Championship)</p><p>欧洲杯</p>|<p>Asian Cup</p><p>亚洲杯</p>|<p>Africa Cup of Nations</p><p>非洲杯</p>|<p>Copa America</p><p>美洲杯</p>|
    |<p>OFC Nations</p><p>大洋洲杯</p>|<p>Olympic Games</p><p>奥运会</p>|<p>Winter Olympics</p><p>冬奥会</p>|<p>World Athletics Championships</p><p>世界田径锦标赛</p>|<p>Club World Cup</p><p>俱乐部世界杯</p>|
    |欧洲职业联赛|||||
    |<p>LFP</p><p>法甲</p>|<p>Bundesliga</p><p>德甲</p>|<p>EPL</p><p>英超</p>|<p>Serie A</p><p>意甲</p>|<p>La Liga</p><p>西甲</p>|
    |欧洲杯赛|||||
    |<p>UEFA Europe League</p><p>欧洲联赛</p>|<p>UEFA Nations League</p><p>欧洲国家联赛</p>|<p>UEFA Champions League (European Cup)</p><p>欧洲冠军联赛</p>|<p>UEFA Super Cup</p><p>欧洲超级杯</p>|<p>UEFA Cup Winners' Cup</p><p>欧洲优胜者杯</p>|


    |国际赛事|||||
    | - | :- | :- | :- | :- |
    |<p>Basketball World Cup</p><p>篮球世界杯</p>|<p>Ice Hockey World Championships</p><p>世界冰球锦标赛</p>|<p>World Handball Championship</p><p>世界手球锦标赛</p>|<p>Volleyball World Championship</p><p>世界排球锦标赛</p>|<p>Association of Tennis Professionals **(ATP)**</p><p>职业网球联合会</p>|
    |<p>OFC Nations</p><p>大洋洲杯</p>|<p>Olympic Games</p><p>奥运会</p>|<p>Winter Olympics</p><p>冬奥会</p>|<p>World Athletics Championships</p><p>世界田径锦标赛</p>|<p>Club World Cup</p><p>俱乐部世界杯</p>|
    |职业联赛|||||
    |<p>NHL</p><p>国家冰球联盟</p>|<p>AHL</p><p>美国冰球联盟</p>|<p>CHL</p><p>加拿大冰球联盟</p>|<p>NPSL</p><p>美国国家超级足球联赛</p>|<p>AFL</p><p>美国室内美式橄榄球联盟</p>|
    |<p>NLL</p><p>国家长曲棍球联盟</p>|<p>ECHL</p><p>东海岸冰球联盟</p>|<p>WBL</p><p>世界篮球联盟</p>|<p>IHL</p><p>国际冰球联盟</p>||
    |欧洲杯赛|||||
    |<p>NCAA</p><p>国家大学体育协会</p>|<p>UEFA Nations League</p><p>欧洲国家联赛</p>|<p>UEFA Champions League (European Cup)</p><p>欧洲冠军联赛</p>|<p>UEFA Super Cup</p><p>欧洲超级杯</p>|<p>UEFA Cup Winners' Cup</p><p>欧洲优胜者杯</p>|

- **27Total Area**	球场的总面积，暂不做任何处理，可忽略，后续可能会作为配套信息展示或筛选、搜索。

- **28Cost**			球场的建造成本，存在空值情况，仅作为配套信息展示。

- **29Index**			为管理数据用，不做任何处理，可忽略。

- **30Link**			原网站每个球场的页面，需要从前端跳转至链接地址。

- **31Constructure Code**  球场屋盖结构形式编码

- **32MainColorCode**  球场的座椅颜色编码

    编码规则：颜色\_合成\_WD，“\_”可作为分隔符。例: ReOrYeGnBl\_JO、ReYeGn\_JO\_WD，对应前端[**信息标签—看台选型—座椅颜色**]。需要解码使用，规则如下：

    |颜色||||
    | - | :- | :- | :- |
    |红色	Re|橙色	Or|黄色	Ye|绿色	Gn|
    |青色	Ch|蓝色	Bl|紫色	Pe|棕色	Br|
    |粉色	Pk|黑色	Bk|白色	Wh|灰色	Gy|
    |无座椅	Vr|未知	Un|||
    |合成||||
    |组合	JO|像素	PI|纯色	PU|图案	PA|
    |文字	WD||||
# **图片库**
图片库在本地以总文件夹——子文件夹——图片的结构存储，在腾讯云服务器中以同样结构保存，云端数据库管理后台提供筛选、重命名、添加备注、管理员批量下载等功能。允许用户在前端单张下载，下载图片的文件名自动变为哈希值-英文名，这将自动隐藏图片标签。

子文件夹命名规则：英文名-中文名，“-”可作为分割符。例：Allianz Arena-慕尼黑安联球场。每个文件夹中的图片数量不一致。

所有图片均为.jpg格式，用户根据文件名中的预设标签和球场英文名进行筛选、搜索。

图片命名规则：序号-英文名-18位标签编码，图片的序号暂不设逻辑。“-”可作为分割符，例：14-Allianz Arena-C02C10D01varvarvar.jpg。在数据库后端的筛选逻辑中提供对标签的单选/多选功能。

- **标签编码规则：**

    共18位字符，每三位构成一个标签，共计最多6个标签，不足6个标签时用var占位。例：14-Allianz Arena-C02C10D01varvarvar.jpg中包含三个标签C01，C10，D01，后面3个var占位。会存在少量没有标签varvarvarvarvarvar的情况。

    图片标签共2级标签，一级：ABECDE五大项，以英文大写字母区分；二级：与一级对应的31小项，以双位阿拉伯数字作区分。

    <table><tr><th rowspan="2" valign="top"><p><b>A</b></p><p><b>外观造型</b></p></th><th valign="top">A01</th><th valign="top">鸟瞰</th></tr>
    <tr><td valign="top">A02</td><td valign="top">人视及细节</td></tr>
    <tr><td rowspan="9" valign="top"><p></p><p></p><p></p><p><b>B</b></p><p><b>室内空间</b></p></td><td valign="top">B01</td><td valign="top">观众大厅</td></tr>
    <tr><td valign="top">B02</td><td valign="top">球员更衣室</td></tr>
    <tr><td valign="top">B03</td><td valign="top">球员通道</td></tr>
    <tr><td valign="top">B04</td><td valign="top">包厢、酒店客房室内</td></tr>
    <tr><td valign="top">B05</td><td valign="top">款待区</td></tr>
    <tr><td valign="top">B06</td><td valign="top">新闻媒体</td></tr>
    <tr><td valign="top">B07</td><td valign="top">俱乐部、纪念品商店</td></tr>
    <tr><td valign="top">B08</td><td valign="top">餐厅、餐饮店</td></tr>
    <tr><td valign="top">B09</td><td valign="top">其他室内空间</td></tr>
    <tr><td rowspan="17" valign="top"><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p><b>C</b></p><p><b>看台场地</b></p></td><td valign="top">C01</td><td valign="top">内场总览</td></tr>
    <tr><td valign="top">C02</td><td valign="top">内场看台</td></tr>
    <tr><td valign="top">C03</td><td valign="top">座椅-普通座椅</td></tr>
    <tr><td valign="top">C04</td><td valign="top">座椅-VIP，VVIP等高档席位座椅</td></tr>
    <tr><td valign="top">C05</td><td valign="top">看台-VIP，VVIP座席区、款待区看台</td></tr>
    <tr><td valign="top">C06</td><td valign="top">看台-残疾人座席区</td></tr>
    <tr><td valign="top">C07</td><td valign="top">看台-媒体座席区</td></tr>
    <tr><td valign="top">C08</td><td valign="top">看台-层间悬挑</td></tr>
    <tr><td valign="top">C09</td><td valign="top">看台-疏散口细部</td></tr>
    <tr><td valign="top">C10</td><td valign="top">看台-栏杆、栏杆、扶手细部</td></tr>
    <tr><td valign="top">C11</td><td valign="top">看台-看台台阶</td></tr>
    <tr><td valign="top">C12</td><td valign="top">看台-死忠看台</td></tr>
    <tr><td valign="top">C13</td><td valign="top">场芯-替补席</td></tr>
    <tr><td valign="top">C14</td><td valign="top">场芯-通道口</td></tr>
    <tr><td valign="top">C15</td><td valign="top">设备-MEP设备</td></tr>
    <tr><td valign="top">C16</td><td valign="top">看台-临时座席</td></tr>
    <tr><td valign="top">C17</td><td valign="top">室内比赛场地</td></tr>
    <tr><td rowspan="2" valign="top"><p><b>D</b></p><p><b>氛围</b></p></td><td valign="top">D01</td><td valign="top">球迷、球赛氛围</td></tr>
    <tr><td valign="top">D02</td><td valign="top">演唱会、展览、宴会、方舱等非体育比赛内容</td></tr>
    <tr><td rowspan="6" valign="top"><p></b>                </p><p></b>                </p><p><b>E</b></p><p><b>结构构件</b></p></td><td valign="top">E01</td><td valign="top">马道</td></tr>
    <tr><td valign="top">E02</td><td valign="top">索膜屋面</td></tr>
    <tr><td valign="top">E03</td><td valign="top">金属屋面</td></tr>
    <tr><td valign="top">E04</td><td valign="top">开合屋盖</td></tr>
    <tr><td valign="top">E05</td><td valign="top">施工过程</td></tr>
    <tr><td valign="top">E06</td><td valign="top">场馆养护</td></tr>
    </table>

- **信息库与图片库联动**
双库联动以球场英文名为唯一链接点，数据库的信息对应到图片库中的图片、图片对应球场的其他信息依据球场英文名作为索引条件。主要以云端展示呈现，

- **数据录入规则 / 顺序**
    新数据进入数据库与服务器，需要经过以下流程：

    1. 填写信息库中的基本信息

    *确保信息内容仅为中文/英文字符*

    2. 建立球场图片文件夹，命名规则符合要求

    *确保文件夹名称与球场英文名/中文名完全一致*

    3. 收集图片

    *确保图片名称与球场英文名完全一致*

    4. 图片批量命名
    5. 图片打标签
    6. 看台类型与座椅颜色、结构看台编码
    7. 存入图片库
    8. 服务器后台进行更新
    9. OVAL原始网站进行更新
