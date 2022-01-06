module.exports = {

    cn: {

        SCHEME:{

            TITLE: 'openEuler迁移方案介绍',

            TITLE_ONE: '迁移面临的关键问题',

            ONE_P1: 'OS迁移面临的关键问题有三个：',

            ONE_QUESTION:[

                '1、 已有的软件是否可以在新系统运行，包括安装，功能运行是否存在问题。',

                '2、 硬件与新OS是否兼容性。',

                '3、 已经做过的相关配置是否可以继承到新OS。'

            ],

            ONE_P2: '因此，迁移的首要问题是先进行兼容性评估，如果存在兼容性问题，需要进行兼容性适配，适配完成后开展搬迁；如果无兼容性问题，则开展搬迁实施；整体流程如下：',

            ONE_PROCESS_IMG: '/img/minisite/scheme/process.png',

            ONE_ANSWER: [

                '（1）兼容性评估：在原有环境上进行硬件、软件、配置兼容性评估，确定是否存在兼容性风险；',

                '（2）移植适配：软件、硬件、OS厂家依据兼容性评估报告，进行相关移植适配；涉及到性能优化的场景，需开展调优工作；',

                '（3）迁移实施：基于全新建立环境（简称新增场景)、在已有集群环境扩容 (简称扩容场景)、将已有环境系统更换 (简称原地替换)场景，制定相关迁移实施方案，保障平滑迁移；需根据业务重要度、软件模型等特点，针对性制定搬迁方案。'

            ],

            ONE_P3:'注：其中（1），（2）主要面向开发人员移植适配，是新增、扩容、原地替换三种场景迁移的前提，（3）主要面向交付人员迁移实施，支持扩容、原地替换场景。',

            TITLE_TWO: 'openEuler Devkit 迁移综合方案概述',

           TWO_P1: 'openEuler devkit 面向迁移全流程提供完整工具链及方案，支撑OS迁移平稳、简单、高效，从基础兼容性、兼容性评估、移植适配、搬迁实施四个方面开展；',

            TWO_SCHEME_IMG: '/img/minisite/scheme/scheme.png',

            TWO_SCHEME: [

               '（1）OS基础兼容性是保障能够迁移的基础，因此OS要提供丰富的兼容性，避免在迁移的过程中，OS基础库不足阻碍迁移进度；',

               '（2）提供兼容性评估工具，从硬件、软件、配置识别兼容性风险；',

               '（3）如果存在不兼容的场景，提供对应的工具帮助开发者快速移植。',

               '（4）所有软件、硬件、配置都兼容的情况下，提供相关的搬迁方案，指导搬迁实施。'

            ],

            TITLE_THREE: 'OS基础兼容性',

            TITLE_THREE_ONE: 'OS基础兼容性介绍',

            THREE_ONE_P1: '关于操作系统兼容性，一般可以分为4个方面：1) 应用程序， 2)与硬件兼容性，3) 虚拟化平台 4) 容器平台 宿主与容器。',

            THREE_ONE_LIST:[

                {title:'（1）硬件兼容性；',content:

                ['芯片兼容性：包括 CPU 芯片架构 (X86_64/ARM64)，基于芯片架构，衍生不同 CPU 厂家，部件芯片(网卡/raid/fc/ib/gpu/ssd/tpm)等。',

                 '整机兼容性： FusionServer、浪潮、联想、新华三、曙光、宝德、神码、同方、长江计算、湘江鲲鹏、四川虹信等。' ,

                 '板卡兼容性：如 Intel、Mellanox、Avago、Emulex、Qlogic、Nvidia、AMD、网讯、华为等。'] },

                 {title: '（2）应用程序兼容性',content: ['开源软件、商业软件、自研软件。']},

                 {title: '（3）虚拟化平台',content: ['主要指虚拟化平台guest与host 之间兼容性。']},

                 {title: '（4）容器平台',content: ['主要指容器平台宿主与容器镜像之间兼容性。']},

            ],

            THREE_ONE_P2: '为了解决以上兼容性适配问题，目前openEuler在社区成立兼容性sig组，主要工作职责为：',

            THREE_ONE_GROUP:[

                '（1）建立社区统一的兼容性适配机制',

                '（2）梳理兼容性测试流程',

                '（3）孵化社区服务化测试平台',

                '（4）开发兼容性测试工具及套件',

                '（5）建立社区兼容性生态测试工程',

            ],

            THREE_ONE_P3: '支撑企业用户、开发者、合作伙伴基于社区服务按需适配软、硬件，共同打造openEuler系丰富的兼容性；',

            THREE_ONE_P4: '这里重点值得说明的是，一般而言硬件厂家会提供一个基础的驱动放置到内核，主要解决基本能用的问题，同时芯片厂家在官网同步发布支持各类操作系统的驱动，保障驱动的 issue 得到及时解决，保障生产系统能够用的好，当前 openEuler 社区得到芯片厂家的大力支持，Mellanox、Avago、Emulex、Qlogic 等厂家官网均发布了针对 openEuler 的驱动，双向发布兼容性，共同保障切换后生产环境的安全运行。',

            TITLE_THREE_TWO: '硬件兼容性适配套件',

            THREE_TWO_P1:'基于社区开源的测试套件 oec-hardware 整机、硬件、芯片厂家可以根据社区硬件',

            THREE_TWO_A1:'兼容性测试流程',

            THREE_TWO_P2:'开展测试，测试完成后，将测试结果提交到社区，社区sig组将测试通过的硬件加入到社区兼容性清单，社区兼容性工作得到硬件厂家的大力支持，且套件已经广泛使用，当前社区已经支持主流X86/ARM架构产品，FusionServer、浪潮、联想、新华三、曙光，宝德、神码、同方、长江计算、湘江鲲鹏、四川虹信等整机厂家； 主流部件芯片产品，如：Intel、Mellanox、Avago、Emulex、Qlogic、Nvidia、AMD、网讯、华为 等详见社区',

            THREE_TWO_A2:'硬件兼容性清单',

 

            TITLE_THREE_THREE: '软件兼容性适配服务',

            THREE_THREE_P1:'支撑企业用户、开发者、合作伙伴基于社区服务 Compass-CI 开展兼容性测试活动，适配流程参考：',

            THREE_THREE_A1:'软件兼容性适配流程',

            THREE_THREE_P2:'；开发人员利用社区提供的基础服务开展适配，Compass-CI 自动将认证通过的软件发布至软件仓库及兼容性清单，便于最终用户快速按需获取。当前社区清单已经支持10000+软件包，覆盖数据库、中间件、Web 服务、⼤数据、虚拟化、云原生、AI、容器技术、开发环境语⾔、安全、系统工具、测试工具，部署工具等主流软件，详见',

            THREE_THREE_A2:'社区软件清单',

          

            TITLE_FOUR: '兼容性评估',

            TITLE_FOUR_ONE: '软件兼容性评估',

            FOUR_ONE_P1:'openEuler社区提供了',

            FOUR_ONE_A1:'x2openEuler 工具',

            FOUR_ONE_P2:'，针对已经编译好的二进制程序，进行依赖软件包、接口评估，明确应用软件是否需要移植适配，是否有依赖的软件包待引入；同时评估软件调用的接口原型在两个系统中是否有差异，指导下一步适配方向。',

            FOUR_ONE_P3:'注：已经编译好的二进制程序，难以保障全部兼容新 OS，严重时会导致踩内存风险，往往这种问题很难通过验证的方式识别出来，迁移前针对软件兼容性评估尤为重要。',

            TITLE_FOUR_TWO: '硬件兼容性评估',

            FOUR_TWO_P2:'，评估硬件兼容性。',

            TITLE_FOUR_THREE: '配置兼容性评估',

            FOUR_THREE_P1:'评估迁移前系统的配置与迁移后的系统兼容性。',

            TITLE_FIVE: '移植适配',

            FIVE_P1:'关于应用适配，一般包括四个部分：1）应用移植适配，2）OS引包，3）硬件适配；4）配置适配',

            TITLE_FIVE_ONE: '应用移植适配',

            FIVE_ONE_P1:'基于',

            FIVE_ONE_P2:'生成兼容性评估报告，提供应用调用的接口在两个操作系统是否存在原型差异，确定是否需要重新编译及修改适配。在需要适配的情况下提供接口的全量信息，便于开发人员一次性代码修改及精准化验证，加速移植后验证效率。',

            TITLE_FIVE_TWO: 'OS软件包适配',

            FIVE_TWO_P1:'基于评估报告，如果发现有缺失的包，参考软件兼容性适配服务章节。适配完成后，将软件包引入至软件仓库及根据需要刷新软件兼容性清单',

            TITLE_FIVE_THREE: '硬件适配',

            FIVE_THREE_P1:'基于评估报告，如果评估发现有硬件不兼容，参考',

            FIVE_THREE_A1:'硬件兼容性测试服务',

            FIVE_THREE_P2:'，引导硬件厂家开展适配，适配完成后将适配驱动发布至软件所仓库及刷新兼容性清单。',

            TITLE_FIVE_FOUR: ' 配置适配',

            FIVE_FOUR_P1:'基于评估报告，',

            FIVE_FOUR_P2:'识别原有系统的客户做的配置，分析与迁移后与系统配置的兼容性差异，指导在替换OS系统上进行同步。',

            TITLE_SIX: '搬迁实施',

            SIX_P1:'对于原地替换场景，通常与软件部署的形态相关，搬迁的实施方案也会不同，这里主要介绍一般情况下的搬迁：单机、主备和分布式。搬迁实施实施前，需要提前熟悉软件部署架构及部署组网，针对性输出对应场景的搬迁方案，目前 openEuler 提供主流场景的搬迁方案，如大数据、分布式存储、虚拟化、容器、数据库软件，并且在政企、运营商、金融多个行业开展搬迁工作。',

            SIX_LIST:[

                {title:'单机软件', content:'该类软件搬迁时，涉及到操作系统切换，基本上会中断业务，需要充分考虑迁移造成的中断影响，选择合适的窗口进行搬迁'},

                {title:'主备软件', content:'该类软件搬迁时，可以选择在业务量较少时，通过倒换搬迁。'},

                {title:'分布式软件', content:'该类软件搬迁时，可以选择在业务量较少时，通过分布式软件的特征，进行滚动搬迁。'},

            ],

            TITLE_SEVNE: '迁移调优',

            SEVEN_P1:'除了保障迁移后取得更好的性能，openEuler社区提供调优工具，A-Tune是一款基于AI开发的系统性能优化引擎，它利用人工智能技术，对业务场景建立精准的系统画像，感知并推理出业务特征，进而做出智能决策，匹配并推荐最佳的系统参数配置组合，使业务处于最佳运行状态。',

            SEVEN_TUNING_IMG: '/img/minisite/scheme/tuning.png',

            SEVEN_P2:'目前已经支持11大类15款应用负载类型自动优化，主要包括：存储、大数据、虚拟化、容器、数据库、中间件、web、HPC等领域模型优化。',
            SEVEN_P2_URL: 'https://a-tune.openeuler.org'
        }

    },

    en: {  

        SCHEME:{

            TITLE: 'openEuler迁移方案介绍',

            TITLE_ONE: '迁移面临的关键问题',

            ONE_P1: '迁移面临的关键问题有三个：',

            ONE_QUESTION:[

                '1、 已有的软件是否可以在新系统运行，包括安装，功能运行是否存在问题。',

                '2、 硬件与新OS是否兼容性。',

                '3、 已经做过的相关配置是否可以继承到新OS。'

            ],

            ONE_P2: '因此，迁移的首要问题是先进行兼容性评估，如果存在兼容性问题，需要进行兼容性适配，适配完成后开展搬迁；如果无兼容性问题，则开展搬迁实施；整体流程如下：',

            ONE_PROCESS_IMG: '/img/minisite/scheme/process.png',

            ONE_ANSWER: [

                '（1）兼容性评估：协助操作在原有环境上进行硬件、软件、配置兼容性评估，确定是否存在兼容性风险；',

                '（2）移植适配：软件、硬件、OS厂家依据兼容性评估报告，进行相关移植适配；涉及到性能优化的场景，需开展调优工作；',

                '（3）迁移实施：基于实际的存量环境，制定相关迁移实施方案，保障平滑迁移，需根据业务重要度、软件模型等特点，针对性制定方案。'

            ],

            ONE_P3:'注：其中（1），（2）主要面向开发态移植适配，覆盖全新建立独立环境(简称新增场景)，在已有集群环境扩容(简称扩容场景)，将已有环境系统更换(简称原地替换)三种场景。（3）主要面向扩容，原地替换场景。',

            TITLE_TWO: 'openEuler迁移综合方案概述 ',

            TWO_P1: 'openEuler devkit提供跨OS迁移整体解决方案，从基础兼容性、兼容性评估、移植适配、搬迁实施四个方面开展；',

            TWO_SCHEME_IMG: '/img/minisite/scheme/scheme.png',

            TWO_SCHEME: [

               '（1）：OS基础兼容性是保障能够迁移的基础，因此OS要提供丰富的兼容性，避免在迁移的过程中，OS基础库不足阻碍迁移进度；',

               '（2）：提供兼容性评估工具，从硬件、软件、配置层帮助识别兼容性风险；',

               '（3）：如果存在不兼容的场景，需要有对应的工具帮助开发者快速移植。',

               '（4）：所有软件、硬件、配置都兼容的情况下，有相关的搬迁方案及计划，指导搬迁实施。'

            ],

            TITLE_THREE: 'OS基础兼容性',

            TITLE_THREE_ONE: 'OS基础兼容性介绍',

            THREE_ONE_P1: '关于操作系统兼容性，一般可以分为5个方面：1) 应用程序， 2)与硬件兼容性，3) 虚拟化平台 4) 容器平台 宿主与容器 5)  OSV 兼容性。',

            THREE_ONE_LIST:[

                {title:'（1）硬件兼容性；',content:

                ['芯片兼容性：包括CPU芯片架构(X86/ARM/alpha/龙芯)，基于芯片架构，衍生不同CPU厂家，如：intel、海光、兆芯，AMD，鲲鹏、飞腾、申威、龙芯；部件芯片(网卡/raid/fc/ib/gpu/ssd/tpm)等。',

                 '整机兼容性：FusionServer、浪潮、联想、新华三、曙光、宝德、神码、同方、长江计算、湘江鲲鹏、长虹 等。' ,

                 '板卡兼容性：intel、mellanox、avago、emulex、qlogic、nvidia、amd、网讯、华为 '] },

                 {title: '（2）应用程序兼容性',content: ['开源软件、商业软件、自研软件。']},

                 {title: '（3）虚拟化平台',content: ['主要指 虚拟化平台guest与host 之间兼容性，如：云宏、深信服、华为云、Easystack、青云、电信云。']},

                 {title: '（4）容器平台',content: ['主要指 容器平台宿主与容器镜像之间兼容性，如：云宏、深信服、华为云、Easystack、青云、电信云。']},

                 {title: '（5）OSV兼容性',content: ['openEuler产品与二次发行商生态复用检测能力，主要是任何一个OSV厂家与软件、硬件一次适配，可以在多个OS 间可以复用，可以有效避免每个OSV在相同软件上的重复投入。']},

            ],

            THREE_ONE_P2: '为了解决以上兼容性适配问题，目前openEuler在社区成立兼容性sig组，主要工作职责为：',

            THREE_ONE_GROUP:[

                '（1）建立社区统一的兼容性适配机制',

                '（2）制定兼容性测试标准化',

                '（3）梳理兼容性测试流程',

                '（4）孵化社区服务化测试平台',

                '（5）开发兼容性测试工具及套件',

                '（6）建立社区兼容性生态测试工程',

            ],

            THREE_ONE_P3: '支撑企业用户、开发者、合作伙伴基于社区服务按需适配软、硬件，共同共同打造openEuler系丰富的兼容性；',

            THREE_ONE_P4: '这里重点值得说明的是，一般而言硬件厂家会提供一个基础的驱动放置到内核，主要解决基本能用的问题，同时芯片厂家在官网同步发布支持各类操作系统的驱动，保障驱动的issue 得到及时解决，保障生产系统能够用的好，当前openEuler社区得到芯片厂家的大力支持，mellanox、avago、emulex、qlogic等厂家官网均发布了针对openEuler的驱动，双向发布兼容性，共同保障切换后生产环境的安全运行。',

            TITLE_THREE_TWO: '硬件兼容性适配套件',

            THREE_TWO_P1:'基于社区开源的测试套件oec-hardware 整机、硬件、芯片厂家可以根据社区硬件',

            THREE_TWO_A1:'兼容性测试流程',

            THREE_TWO_P2:'开展测试，测试完成后，将测试结果提交到社区，社区sig组将测试通过的硬件加入到社区兼容性清单，社区兼容性工作得到硬件厂家的大力支持，且套件已经广泛使用，当前社区intel、海光、兆芯，AMD，鲲鹏、飞腾CPU芯片，FusionServer、浪潮、联想、新华三、曙光，宝德、神码、同方、长江计算、湘江鲲鹏、长虹等整机厂家；intel、mellanox、avago、emulex、qlogic、nvidia、amd、网讯、华为等服务器领域主流的部件芯片及板卡，详见社区',

            THREE_TWO_A2:'硬件兼容性清单',

 

            TITLE_THREE_THREE: '软件兼容性适配服务',

            THREE_THREE_P1:'支撑企业用户、开发者、合作伙伴基于社区服务compass-ci开展兼容性测试活动，适配流程参考：',

            THREE_THREE_A1:'软件兼容性适配流程',

            THREE_THREE_P2:'；开发人员利用社区提供的基础服务开展适配及测试通过，自动化将认证通过的软件发布至软件仓库及兼容性清单，便于最终用户快速按需获取。当前社区清单已经支持10000+软件包，覆盖数据库、中间件、Web服务、大数据、虚拟化、云原生、AI、容器技术、开发环境语言、安全、系统工具、测试工具，部署工具等主流软件，详见',

            THREE_THREE_A2:'社区软件清单',

          

            TITLE_THREE_FOUR: 'OSV 认证适配服务',

            THREE_FOUR_P1:'支持OSV企业基于社区套件在二次发行过程中，识别影响兼容性的部分，最大程度保障社区生态与商业生态融合，降低兼容性适配重复，社区孵化oecp项目，适配流程参考：',

            THREE_FOUR_A1: 'OSV认证适配指导',

            THREE_FOUR_P2: '，认证过后信息会发布大社区清单，目前工作正在试运行阶段，预计3月份对外开放。',

            TITLE_FOUR: '兼容性评估',

            TITLE_FOUR_ONE: '软件兼容性评估',

            FOUR_ONE_P1:'openEuler社区提供了',

           FOUR_ONE_A1:'x2openEuler 工具',

            FOUR_ONE_P2:'，针对已经编译好的二进制程序，进行主要完成软件包、接口级评估，明确应用软件是否需要移植适配，是否有依赖的软件包待引入；同时评估软件调用的接口原型在两个系统中是否有差异。',

            FOUR_ONE_P3:'注：已经编译好的二进制程序，难以保障全部兼容新OS，严重时会引发才内存风险，往往这种问题很难通过验证的方式识别出来，迁移前针对软件兼容性评估尤为重要。',

            TITLE_FOUR_TWO: '硬件兼容性评估',

            FOUR_TWO_P2:'，评估硬件兼容性。',

            TITLE_FOUR_THREE: '配置兼容性评估',

            FOUR_THREE_P1:'识别系统的配置与迁移后的系统兼容性。',

            TITLE_FIVE: '移植适配',

            FIVE_P1:'关于应用适配，一般包括四个部分：1）应用移植适配，2）OS引包，3）硬件适配；4）配置适配',

            TITLE_FIVE_ONE: '应用移植适配',

            FIVE_ONE_P1:'基于',

            FIVE_ONE_P2:'生成兼容性评估报告，提供应用调用的接口在两个操作系统是否存在原型差异，确定是否需要重新编译及修改适配，并给出有接口差异分类及有哪些接口涉及，便于开发人员一次性修订及精准化验证，加速移植后验证效率。',

            TITLE_FIVE_TWO: 'OS软件包适配',

            FIVE_TWO_P1:'基于评估报告，如果发现有缺失的包，参考3.2.2 软件兼容性适配服务，适配完成后，将软件包引入至软件仓库及根据需要刷新软件兼容性清单',

            TITLE_FIVE_THREE: '硬件适配',
            FIVE_THREE_P1:'基于评估报告，如果评估发现有硬件不兼容，参考2.2.1',
            FIVE_THREE_A1:'硬件兼容性测试服务',
            FIVE_THREE_P2:'引导硬件厂家开展适配，适配完成后将适配驱动发布至软件所仓库及刷新兼容性清单。',
            TITLE_FIVE_FOUR: ' 配置适配',
            FIVE_FOUR_P1:'基于评估报告，',
            FIVE_FOUR_P2:'识别原有系统的客户做的配置，分析与迁移后与系统配置的兼容性差异，指导在新替换OS系统上进行同步。',
            TITLE_SIX: '搬迁实施',
            SIX_P1:'对于存量原地替换，通常与软件部署的形态相关，搬迁的实施方案也会不同，这里主要介绍一般情况下的搬迁: 单机、主备和分布式。搬迁实施实施前，需要提前熟悉软件部署架构及部署组网，针对性输出对应场景的搬迁方案，目前主要针对多个领域：如大数据、分布式存储、虚拟化、容器、数据库软件的搬迁方案，支撑政企、运营商、金融企业开展搬迁工作开展，协助后续搬迁方案作为参考，实际以具体要求为准。',
            SIX_LIST:[
                {title:'单机软件', content:'该类软件搬迁时，涉及到操作系统切换，基本上会中断业务，需要充分考虑迁移造成的中断影响，选择合适的窗口进行搬迁'},
                {title:'主备软件', content:'该类软件搬迁时，可以选择在业务量较少时，通过倒换搬迁。'},
                {title:'分布式软件', content:'该类软件搬迁时，可以选择在业务量较少时，通过分布式软件的特征，进行滚动搬迁。'},
            ],
            TITLE_SEVNE: '迁移调优',
            SEVEN_P1:'除了保障迁移后取得更好的性能，openEuler 社区提供调优工具，A-Tune 是一款基于 AI 开发的系统性能优化引擎，它利用人工智能技术，对业务场景建立精准的系统画像，感知并推理出业务特征，进而做出智能决策，匹配并推荐最佳的系统参数配置组合，使业务处于最佳运行状态。',
            SEVEN_TUNING_IMG: '/img/minisite/scheme/tuning.png',
            SEVEN_P2:'目前已经支持11大类15款应用负载类型自动优化，主要包括：存储、大数据、虚拟化、容器、数据库、中间件、WEB、HPC 等领域模型优化。',
            SEVEN_P2_URL: 'https://a-tune.openeuler.org'
        }

    },

    ru: {

 

    }

     

    

  

    

}