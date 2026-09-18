import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const files = [
      {
        src: 'C:\\Users\\jaya jat\\.gemini\\antigravity-ide\\brain\\ee5ff968-f30c-48e0-9bae-71024ec79afc\\careers_hero_bg_1789456448195.jpg',
        destName: 'careers_mentorship_bg.jpg',
        altName: 'careers_hero_bg.jpg'
      }
    ]

    const copied = []
    for (const item of files) {
      const target1 = path.join(process.cwd(), 'public', item.destName)
      const target2 = path.join(process.cwd(), 'public', item.altName)
      try { if (fs.existsSync(target1)) fs.unlinkSync(target1) } catch(e) {}
      try { if (fs.existsSync(target2)) fs.unlinkSync(target2) } catch(e) {}
      fs.copyFileSync(item.src, target1)
      fs.copyFileSync(item.src, target2)
      copied.push(item.destName, item.altName)
    }

    return new Response(JSON.stringify({ success: true, copied }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

