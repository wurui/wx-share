<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:oxm="https://www.openxsl.com">
    <xsl:template match="/root" name="wurui.wx-share">
    	<xsl:param name="title"></xsl:param>
    	<xsl:param name="img"></xsl:param>
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-wx-share" data-title="{$title}" data-img="{$img}" ox-mod="wx-share">
        	<xsl:if test="env/domain ='local' or env/domain ='demo' ">
	            <h1>
	                This is mod wx-share;
	            </h1>
            </xsl:if>
        </div>
    </xsl:template>
</xsl:stylesheet>
