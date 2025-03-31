import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. Do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to generate project images based on README content
export async function generateProjectImage(readmeContent: string, projectTitle: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a visually appealing, abstract tech illustration representing a software project titled "${projectTitle}" with the following focus: ${readmeContent.substring(0, 300)}. 
      Use a professional color scheme with blues and light colors. Make it suitable for a professional portfolio website. Create a modern, clean design that represents data engineering, machine learning, or software development concepts.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    // Ensure the URL is not undefined
    if (!response.data[0].url) {
      throw new Error("No image URL returned from OpenAI");
    }

    return response.data[0].url as string;
  } catch (error) {
    console.error("Error generating image:", error);
    // Return a default image URL if generation fails
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80";
  }
}

// Function to get README content from GitHub URL
export async function getReadmeFromGitHub(githubUrl: string): Promise<string> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];
    
    // Fetch README content from GitHub API
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.status}`);
    }
    
    const data = await response.json();
    
    // README content is base64 encoded
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    
    // Return a summary of the README (first 500 characters)
    return content.substring(0, 500);
  } catch (error) {
    console.error("Error fetching README:", error);
    return "A professional software development project focused on innovation and technical excellence.";
  }
}