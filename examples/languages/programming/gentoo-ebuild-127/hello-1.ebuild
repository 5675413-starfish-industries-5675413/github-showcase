EAPI=8
DESCRIPTION="Hello, world! demonstration"
HOMEPAGE="https://github.com/github-linguist/linguist"
LICENSE="MIT"
SLOT="0"
KEYWORDS="~amd64"
S="${WORKDIR}"
src_install() {
  insinto /usr/share/hello
  echo 'Hello, world!' > hello.txt || die
  doins hello.txt
}
