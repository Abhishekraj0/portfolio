import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const portfolioAPI = {
  // Get portfolio data
  async getPortfolioData() {
    const { data, error } = await supabase
      .from('portfolio_config')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  // Update portfolio data
  async updatePortfolioData(updates) {
    const { data, error } = await supabase
      .from('portfolio_config')
      .update(updates)
      .eq('id', 1)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get experiences
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add/Update experience
  async upsertExperience(experience) {
    const { data, error } = await supabase
      .from('experiences')
      .upsert(experience)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete experience
  async deleteExperience(id) {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add/Update project
  async upsertProject(project) {
    const { data, error } = await supabase
      .from('projects')
      .upsert(project)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete project
  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get skills
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Update skills
  async updateSkills(skills) {
    // Delete existing skills
    await supabase.from('skills').delete().neq('id', 0)
    
    // Insert new skills
    const { error } = await supabase
      .from('skills')
      .insert(skills)
      .select()
    
    if (error) throw error
    return skills
  },

  // Upload file
  async uploadFile(file, bucket = 'portfolio-assets') {
    try {
      console.log('Starting file upload:', file.name, file.size, file.type);
      
      // First, try the storage bucket approach
      try {
        const fileExt = file.name.split('.').pop().toLowerCase();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        console.log('Attempting storage bucket upload...');
        
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (uploadError) {
          console.log('Storage bucket failed, trying fallback method...');
          throw uploadError;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);
        
        console.log('Storage bucket upload successful:', publicUrl);
        return publicUrl;
        
      } catch (storageError) {
        console.log('Storage bucket method failed, using base64 fallback...');
        
        // Fallback: Convert to base64 and store in database
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          
          reader.onload = () => {
            const base64Data = reader.result;
            console.log('File converted to base64, size:', base64Data.length);
            resolve(base64Data);
          };
          
          reader.onerror = () => {
            reject(new Error('Failed to read file'));
          };
          
          reader.readAsDataURL(file);
        });
      }
      
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  },

  // Authentication
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}