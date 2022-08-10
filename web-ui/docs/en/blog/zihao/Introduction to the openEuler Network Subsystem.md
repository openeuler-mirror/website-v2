# Introduction to the openEuler Network Subsystem

Interconnection between computers is key to the computer network for ensuring information transmission and sharing. As bottom-layer software, the OS plays an important role in communication.

> The openEuler network subsystem is responsible for network I/Os. It exchanges data with network devices (such as routers and switches).

This blog briefly introduces the network subsystem of openEuler by explaining the network model and the innovative technologies of the openEuler kernel in network communication. In this way, it may provide you with a basic understanding of the network subsystem of openEuler.

## Network Model

The OSI seven-layer reference model is a standard system formulated by the ISO for interconnection between computers or communication systems. It specifies a series of abstract term concepts and protocols. However, in reality, the TCP/IP five-layer model has gained an advantage by quickly occupying the market (the first one takes all). TCP/IP consists of only five layers: application layer, transport layer, network layer, link layer, and physical layer, greatly reducing the workload of hardware vendors. The presentation layer and session layer in the OSI model are replaced with the application layer in the TCP/IP model.

The computer network is used for end-to-end communication. On the data plane, almost each layer directly communicates with the same layer on the peer end, regardless of details of the bottom layer. The following describes the main functions of the five-layer model.

- Physical layer: transmits data packets physically, such as Wi-Fi and Ethernet protocols.
- Data link layer: transmits data between endpoints.
- Network layer: forwards data packets and encodes hosts.
- Transport layer: transmits data between nodes.
- Application layer: various application layer protocols, such as HTTP and FTP.

Generally, the physical layer and application layer are not involved in the OS. Therefore, pay attention only to the following in most cases:

1. Data protocol parsing at the data link layer: After a data packet is received, it is transmitted to the network layer. The destination determines the subsequent operations.

2. Protocol parsing at the network layer: Analyze the destination. If the destination is the local host, the data is uploaded. Otherwise, the data is returned to the data link layer for transmission.

3. Data sending at the transport layer: The transport layer delivers data packets in sequence based on the given data packet format.

## Linux Subsystem

As a general-purpose OS, Linux is required to be compatible with most hardware. Therefore in practice, the gaps between physical devices are narrowed by logical abstraction and parameter adjustment. The following takes `net_device`, the most important structure of Linux network devices, as an example.

```
struct net_device {
    char            name[IFNAMSIZ];
    struct netdev_name_node    *name_node;
    struct dev_ifalias    __rcu *ifalias;
    /*
     *    I/O specific fields
     *    FIXME: Merge these and struct ifmap into one
     */
    unsigned long        mem_end;
    unsigned long        mem_start;
    unsigned long        base_addr;
    int            irq;
 
    /*
     *    Some hardware also needs these fields (state,dev_list,
     *    napi_list,unreg_list,close_list) but they are not
     *    part of the usual set specified in Space.c.
     */
 
    unsigned long        state;
 
    struct list_head    dev_list;
    struct list_head    napi_list;
    struct list_head    unreg_list;
    struct list_head    close_list;
    struct list_head    ptype_all;
    struct list_head    ptype_specific;
 
    struct {
        struct list_head upper;
        struct list_head lower;
    } adj_list;
 
    netdev_features_t    features;
    netdev_features_t    hw_features;
    netdev_features_t    wanted_features;
    netdev_features_t    vlan_features;
    netdev_features_t    hw_enc_features;
    netdev_features_t    mpls_features;
    netdev_features_t    gso_partial_features;
 
    int            ifindex;
    int            group;
    ……
```

For details about the code, see [https://github.com/openeuler-mirror/native-turbo-kernel/blob/62f8a4e02acf2a3367942f70f127def4138dd213/include/linux/netdevice.h#:~:text=struct%20net_device%20%7B,int%09%09%09group%3B](https://github.com/openeuler-mirror/native-turbo-kernel/blob/62f8a4e02acf2a3367942f70f127def4138dd213/include/linux/netdevice.h#:~:text=struct net_device {,int			group%3B). As the main implementation of the data link layer, the network device driver is responsible for two major tasks:

- Receiving data packets and transmitting them to the network layer
- Sending data packets to other ends

As an abstraction of network devices, this structure contains all information about the network device driver. However, in reality, additional definition is required. In this case, you only need to define a structure to contain the `net_device` structure as a member. Before using this function, you need to register the device by calling register_netdev() and define the data structure.

Here we can see that the Linux protocol stack calls some functions to implement general processing at the data link layer and routing at the IP layer.

> Remember that the layers of the OSI model and TCP/IP model are logical, which makes it easy to understand and define the boundaries and responsibilities of software design.

## XDP

The openEuler 21.09 White Paper mentions a kernel innovation, that is, support for XDP.

> XDP is a powerful new networking feature that enables high-performance programmable access to networking packets before they enter the networking stack, improving network performance. It works in various scenarios such as anti-DDoS, firewall, and network QoS.

XDP advantages: programmability and kernel collaboration. 

**Programmability**: In the trend of intelligent network hardware, programmability can be applied to multiple scenarios. 

**Kernel collaboration**: XDP does not completely bypass the kernel. It can work with the kernel when necessary to facilitate unified network management and deployment.

XDP defines a limited execution environment and runs in an eBPF instruction VM. It processes user-defined data packets (including redirection ones) at the position where the packets can be processed the earliest after the NIC receives them.

For example, when the server is handling DDoS attacks, XDP can directly process the IP addresses in the blocklist in the kernel, which greatly improves the CPU utilization.

## References

[openEuler Network Subsystem: Introduction to the Architecture of the openEuler Network Subsystem (gitee.com)](https://gitee.com/MrRlu/openeuler_network_subsystem#结语)

[Linux Kernel Network (1) – Preliminary Study on Kernel Network](https://gitee.com/link?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F363718587)

[openEuler-whitepaper-2109.pdf](https://gitee.com/link?target=https%3A%2F%2Fwww.openeuler.org%2Fwhitepaper%2FopenEuler-whitepaper-2109.pdf)

[Using eXpress Data Path (XDP) to Defend Against DDoS Attacks](https://gitee.com/link?target=https%3A%2F%2Fblog.csdn.net%2Fdog250%2Farticle%2Fdetails%2F77993218)

 