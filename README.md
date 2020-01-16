# peframe

[![Run on Ainize](https://ainize.ai/static/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=github.com/kmkwon94/ainized-peframe)

peframe is a open source tool to perform static analysis on [Portable
Executable](http://en.wikipedia.org/wiki/Portable_Executable) malware
and generic suspicious file. It can help malware researchers to detect
packer, xor, digital signature, mutex, anti debug, anti virtual machine,
suspicious sections and functions, macro and much more information about
the suspicious files.

# Ainize Peframe

I ainized this program, so you don't need to setting environment. You just click 'Run on Ainize' and can see performed automatically on ainized server. The result will be shown as json, You can download json file and used in your area.

# How to Run

1. click 'Run on ainize'

## Install

**Download**

```{.}
sudo apt install git
git clone https://github.com/guelfoweb/peframe.git
cd peframe
```

**Installation script for Ubuntu**

```{.}
sudo bash install.sh
```

**Installation (prerequisites required)**

```{.}
sudo python3 setup.py install
```

**Prerequisites**

The following prerequisites are required to be installed on your system
before you can install and use peframe.

```{.}
python >= 3.6.6
pyton3-pip
libssl-dev
swig
```

## Usage

peframe -h

```{.}
peframe filename            Short output analysis
peframe -i filename         Interactive mode
peframe -j filename         Full output analysis JSON format
peframe -x STRING filename  Search xored string
peframe -s filename         Strings output
```

**Note**

You can edit \"config-peframe.json\" file in \"config\" folder to
configure virustotal API key. After installation you can use \"peframe
-h\" to find api_config path.

## How to work

**MS Office (macro) document analysis with peframe 6.0.1**

[![image](https://asciinema.org/a/mbLd5dChz9iI8eOY15fC2423X.svg)](https://asciinema.org/a/mbLd5dChz9iI8eOY15fC2423X?autoplay=1)

**PE file analysis with peframe 6.0.1**

[![image](https://asciinema.org/a/P6ANqp0bHV0nFsuJDuqD7WQD7.svg)](https://asciinema.org/a/P6ANqp0bHV0nFsuJDuqD7WQD7?autoplay=1)

## Talk about\...

> - [Integration of Static and Dynamic Analysis for Malware Family
>   Classification with Composite Neural
>   Network](https://www.groundai.com/project/integration-of-static-and-dynamic-analysis-for-malware-family-classification-with-composite-neural-network/) > _(Yao Saint, Yen Institute of Information Science, Academia
>   Sinica, Taiwan)_
> - [Machine Learning Aided Static Malware Analysis: A Survey and
>   Tutorial](https://www.researchgate.net/publication/324702503_Machine_Learning_Aided_Static_Malware_Analysis_A_Survey_and_Tutorial) > _(Sergii Banin, Andrii Shalaginov, Ali Dehghantanha, Katrin
>   Franke, Norway)_
> - [Multinomial malware classification, research of the Department of
>   Information Security and Communication Technology
>   (NTNU)](https://www.sciencedirect.com/science/article/pii/S1742287618301956) > _(Sergii Banin and Geir Olav Dyrkolbotn, Norway)_
> - [SANS DFIR Poster
>   2016](http://digital-forensics.sans.org/media/Poster_SIFT_REMnux_2016_FINAL.pdf) > _(PEframe was listed in the REMnux toolkits)_
> - [Tools for Analyzing Static Properties of Suspicious Files on
>   Windows](http://digital-forensics.sans.org/blog/2014/03/04/tools-for-analyzing-static-properties-of-suspicious-files-on-windows) > _(SANS Digital Forensics and Incident Response, Lenny Zeltser)._
> - [Automated Static and Dynamic Analysis of
>   Malware](http://www.cyberdefensemagazine.com/newsletters/august-2013/index.html#p=26) > _(Cyber Defence Magazine, Andrew Browne, Director Malware Lab
>   Lavasoft)._
> - [Suspicious File Analysis with
>   PEframe](https://eforensicsmag.com/download/malware-analysis/) > _(eForensics Magazine, Chintan Gurjar)_
> - [CERT FR Security
>   Bulletin](https://www.cert.ssi.gouv.fr/actualite/CERTFR-2014-ACT-030/) > _(PEframe was mentioned in the security bulletin
>   CERTFR-2014-ACT-030)_
> - [Infosec CERT-PA Malware
>   Analysis](https://infosec.cert-pa.it/analyze/submission.html) > _(PEframe is used in the malware analysis engine of Infosec
>   project)_

## Other

This tool is currently maintained by [Gianni \'guelfoweb\'
Amato](http://guelfoweb.com/), who can be contacted at
<guelfoweb@gmail.com> or twitter
[\@guelfoweb](http://twitter.com/guelfoweb). Suggestions and criticism
are welcome.
