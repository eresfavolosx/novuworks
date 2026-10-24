const fs = require('fs');
const path = require('path');

const files = [
  'subdomains/bizpay/index.html',
  'subdomains/bizpay/Pages/Payments.html',
  'subdomains/bizpay/Pages/Payroll.html',
  'subdomains/bizpay/Pages/Fulltime-details.html'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');

  content = content.replace(/http:\/\/bjstlh\.com\/data\/wallpapers\/65\/WDF_1102999\.jpg/g, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=faces');
  content = content.replace(/http:\/\/www\.long-distance-lover\.com\/wp-content\/uploads\/2013\/09\/testimonial121\.jpg/g, 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=faces');
  content = content.replace(/http:\/\/www\.american\.edu\/uploads\/profiles\/large\/chris_palmer_profile_11\.jpg/g, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces');

  fs.writeFileSync(f, content, 'utf8');
  console.log(`Updated ${f} (LF normalized, insecure URLs replaced)`);
}
