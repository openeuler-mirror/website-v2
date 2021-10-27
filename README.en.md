# website-v2
English | [简体中文](./README.md)

#### Description
Website-v2 is the source code repository of the [openEuler community official website](https://openeuler.org/en/).
#### Software Architecture
The website uses VuePress + Node.js as the basic framework of the front- and back-end. Most functions are only rendered through static files, and only a few function modules (calendar, CVE, and search) require back-end deployment.

The file directories are described as follows:

```
website-v2
    ├─ data    //This directory stores the module data independently maintained by a specific responsible person. For example, the current directory stores the data required for compatibility query.
    ├─ script  //This directory stores the scripts required to import documents, blogs, and news to Elasticsearch (ES).
    ├─ server  //This directory stores the code required for back-end deployment and operations. For details, refer to the README.md file in this directory.
    ├─ web-ui  //This directory stores the code required for front-end deployment and operations. For details, refer to the README.md file in this directory.
```

#### Installation

1. For front-end project deployment, refer to the  **README.md**  file in the  **website-v2/web-ui/**  directory.
2. For back-end project deployment, refer to the  **README.md**  file in the  **website-v2/server/**  directory.

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request
