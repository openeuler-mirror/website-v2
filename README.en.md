# website-v2

#### Description
Website-v2 is the source code repository of openeuler community official website(https://openeuler.org/en/).
#### Software Architecture
The website used vuepress + node.js as the basic framework of the front and back end. Most of the functions are only rendered through static files, and only a few function modules (calendar, CVE, search) need back-end deployment.

The file directory is explained as follows:

website-v2
    ├─ data    //This directory stores the module data independently maintained by a specific responsible person. For example, the current directory stores the data required for compatibility query.
    ├─ script  //This directory stores the scripts needed to import documents, blogs and news into es (elastic search).
    ├─ server  //This directory stores the code needed for back-end deployment and operation. For details, please refer to the README.md file in this directory.
    ├─ web-ui  //This directory stores the code needed for front-end deployment and operation. For details, please refer to the README.md file in this directory.

#### Installation

1. For front-end project deployment, please refer to README.md file in website-v2 / web-ui / directory.
2. For back-end project deployment, please refer to the README.md file in the website-v2 / server / directory.

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request
