import re, json, urllib.parse
html = open('apex_site.html','r',encoding='utf-8').read()
blocks = re.findall(r'<a class="card[\s\S]*?</a>', html)
products = []
for b in blocks:
    mimg = re.search(r'src="([^"]+)"', b)
    img = mimg.group(1) if mimg else ''
    if img.startswith('/_next/image?url='):
        q = img.split('url=')[1]
        q = q.split('&')[0]
        img = urllib.parse.unquote(q)
    mname = re.search(r'<h2 class="card-title">\s*([^<]+)\s*</h2>', b)
    name = mname.group(1).strip() if mname else ''
    mprice = re.search(r'<span[^>]*>\$+([0-9,\.]+)\s*</span>', b)
    price = mprice.group(1) if mprice else ''
    if name:
        products.append({'name':name,'price':price,'image':img})
print(json.dumps(products, ensure_ascii=False, indent=2))
with open('apex_products.json','w',encoding='utf-8') as f:
    json.dump(products,f,ensure_ascii=False,indent=2)
