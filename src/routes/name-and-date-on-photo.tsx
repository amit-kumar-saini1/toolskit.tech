import { createFileRoute, Link } from "@tanstack/react-router";
import NameDateOnPhotoWidget from "@/components/tools/widgets/NameDateOnPhotoWidget";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";
import heroImg from "@/assets/name-date-photo-example.jpg";

export const Route = createFileRoute("/name-and-date-on-photo")({
  head: () => {
    const base = buildPageHead({
      title: "Add Name & Date to Photos Online",
      description:
        "Easily add name and date on photos with ToolsKit. Create, customize, and print passport-size images online for job applications, government portals, and more.",
      keywords: "add name and date on photo, name and date on photo, passport size photo",
      path: "/name-and-date-on-photo",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I add name and date on photo online?", acceptedAnswer: { "@type": "Answer", text: "Upload your photo, type your name and the date, choose colours and click Download. Your photo with name and date is ready in seconds." } },
        { "@type": "Question", name: "Is the Add Name & Date to Photos tool free?", acceptedAnswer: { "@type": "Answer", text: "Yes, this tool is 100% free with no signup, no watermark and no upload limit." } },
        { "@type": "Question", name: "Can I use it for passport size photo?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can add name and date on a passport-size photo for job applications, government portals and school forms." } },
        { "@type": "Question", name: "Are my photos safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. Everything runs inside your browser. Your photo is never uploaded to any server." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/name-and-date-on-photo"
      h1="Add Name & Date to Photos Online"
      subtitle="Welcome to ToolsKit – Your Go-To Solution to Add Name and Date on Photos!"
      tool={<NameDateOnPhotoWidget />}
      content={<Content />}
    />
  );
}

function Content() {
  return (
    <>
      <p>
        Have you ever struggled to create a picture-perfect image for an online
        application or passport renewal? Many government and job portals require
        a photo with your name and date clearly displayed. But who has the time
        or resources to visit a professional photo studio?
      </p>
      <p>
        ToolsKit is here to simplify your life! Our user-friendly online tool
        allows you to add your name and date directly onto your photos,
        eliminating the need for expensive studio visits or complicated editing
        software.
      </p>
      <p className="text-center my-6">
        <img
          src={heroImg}
          width={900}
          height={900}
          loading="lazy"
          alt="Write Name & Date on Passport Size Image with ToolsKit"
          className="rounded-xl mx-auto max-w-full h-auto"
        />
      </p>

      <h2>Key Features:</h2>
      <ul>
        <li><b>Add Name and Date to Photos Online:</b> Our tool allows you to effortlessly write your name and the date on your photos. Whether you need a passport-size photo with your name and date or a regular photo, we've got you covered.</li>
        <li><b>Customize Photo Size:</b> Choose from standard passport sizes such as 3.5 cm x 4.5 cm, 2 inches x 2 inches, or select a custom size that fits your needs. We cater to requirements for various countries, including India, Australia, and the USA.</li>
        <li><b>Customization Text:</b> Choose the font style, size, and color that best suits your needs.</li>
        <li><b>Crop and Edit Backgrounds:</b> Easily crop your photo to the desired size and change the background to meet official guidelines or personal preferences.</li>
        <li><b>Print Multiple Photos:</b> Save your edited images on an A4 or half-A4 page, allowing you to print multiple copies of your passport-size photos in one go.</li>
      </ul>

      <h2>How to Add Name & Date on Photo</h2>
      <ol>
        <li><b>Upload Your Photo:</b> Select the photo you want to edit from your device.</li>
        <li><b>Select Photo Size:</b> Choose from our predefined sizes or enter custom dimensions to suit your specific needs.</li>
        <li><b>Edit and Crop:</b> Use our cropping tool to ensure your photo is the perfect size. Change the background if necessary.</li>
        <li><b>Add Name and Date:</b> Use our text tool to write your name and the date on the image. Adjust the position, font, and size to your liking.</li>
        <li><b>Download and Print:</b> Save your edited photo on an A4 or half-A4 layout, ready for printing multiple copies.</li>
      </ol>

      <h3>Perfect for Multiple Uses</h3>
      <p>ToolsKit isn't just limited to passport photos. Use it for:</p>
      <ul>
        <li><b>Online Job Applications:</b> Make a strong first impression with a professional-looking photo that includes your name and date.</li>
        <li><b>School and University Applications:</b> Ensure your application photo adheres to specific formatting guidelines.</li>
        <li><b>Creating Personalized Gifts:</b> Add a special touch to photos for friends and family with a name and date.</li>
      </ul>
      <p>
        So ditch the stress and skip the studio! ToolsKit empowers you to create
        perfect photos with your name and date right from your home computer.
        It's free, easy to use, and gives you the flexibility to customize your
        photos exactly how you need them. Try ToolsKit today and see the
        difference!
      </p>

      <p className="mt-6">
        Need more handy tools? Try the
        <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>,
        the
        <Link to="/remove-background" className="text-primary underline mx-1">Remove Background</Link>
        or the
        <Link to="/age-calculator" className="text-primary underline mx-1">Age Calculator</Link>
        – all free on ToolsKit.tech.
      </p>
    </>
  );
}
